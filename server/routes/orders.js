import express from 'express';
import SalesOrder from '../models/SalesOrder.js';
import PurchaseOrder from '../models/PurchaseOrder.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all sales orders
router.get('/sales', authenticateToken, async (req, res) => {
  try {
    let query = {};
    
    // Salespersons can only see their own orders
    if (req.user.role === 'salesperson') {
      query.createdBy = req.user._id;
    }

    const orders = await SalesOrder.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get sales orders error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

// Create sales order
router.post('/sales', authenticateToken, authorize('salesperson'), async (req, res) => {
  try {
    const { customerName, SP, CP } = req.body;

    const order = new SalesOrder({
      customerName,
      SP,
      CP,
      createdBy: req.user._id
    });

    await order.save();
    await order.populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Sales order created successfully',
      order
    });
  } catch (error) {
    console.error('Create sales order error:', error);
    res.status(500).json({ message: 'Server error creating order' });
  }
});

// Update sales order
router.put('/sales/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if user owns the order (for salesperson) or has purchase role
    let query = { _id: id };
    if (req.user.role === 'salesperson') {
      query.createdBy = req.user._id;
    }

    const order = await SalesOrder.findOneAndUpdate(
      query,
      updates,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    res.json({
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    console.error('Update sales order error:', error);
    res.status(500).json({ message: 'Server error updating order' });
  }
});

// Delete sales order
router.delete('/sales/:id', authenticateToken, authorize('salesperson'), async (req, res) => {
  try {
    const { id } = req.params;

    const order = await SalesOrder.findOneAndDelete({
      _id: id,
      createdBy: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete sales order error:', error);
    res.status(500).json({ message: 'Server error deleting order' });
  }
});

// Approve/Reject sales order (Purchase department)
router.patch('/sales/:id/status', authenticateToken, authorize('purchase'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await SalesOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('createdBy', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: `Order ${status.toLowerCase()} successfully`,
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error updating order status' });
  }
});

// Get purchase orders for vendor
router.get('/purchase', authenticateToken, authorize('vendor'), async (req, res) => {
  try {
    const orders = await PurchaseOrder.find({ vendorId: req.user._id })
      .populate('salesOrderId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get purchase orders error:', error);
    res.status(500).json({ message: 'Server error fetching purchase orders' });
  }
});

// Update purchase order status (Vendor)
router.patch('/purchase/:id/status', authenticateToken, authorize('vendor'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Confirmed', 'Delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await PurchaseOrder.findOneAndUpdate(
      { _id: id, vendorId: req.user._id },
      { status },
      { new: true }
    ).populate('salesOrderId');

    if (!order) {
      return res.status(404).json({ message: 'Purchase order not found or unauthorized' });
    }

    res.json({
      message: `Purchase order ${status.toLowerCase()} successfully`,
      order
    });
  } catch (error) {
    console.error('Update purchase order status error:', error);
    res.status(500).json({ message: 'Server error updating purchase order status' });
  }
});

export default router;