import mongoose from 'mongoose';

const purchaseOrderSchema = new mongoose.Schema({
  salesOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesOrder',
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Delivered'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

export default mongoose.model('PurchaseOrder', purchaseOrderSchema);