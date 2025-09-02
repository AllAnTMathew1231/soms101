import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VendorOrdersChart } from '@/components/charts/VendorOrdersChart';
import { DeliveryPerformanceChart } from '@/components/charts/DeliveryPerformanceChart';

interface PurchaseOrder {
  id: string;
  customerName: string;
  amount: number;
  status: 'Pending' | 'Confirmed' | 'Delivered';
  createdAt: string;
  deliveryDate?: string;
}

export function VendorDashboard() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockOrders: PurchaseOrder[] = [
      {
        id: '1',
        customerName: 'Acme Corp',
        amount: 1000,
        status: 'Pending',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        customerName: 'Tech Solutions',
        amount: 1400,
        status: 'Confirmed',
        createdAt: '2024-01-16',
        deliveryDate: '2024-01-20'
      },
      {
        id: '3',
        customerName: 'Global Industries',
        amount: 1800,
        status: 'Delivered',
        createdAt: '2024-01-17',
        deliveryDate: '2024-01-19'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const pendingOrders = orders.filter(order => order.status === 'Pending');
  const confirmedOrders = orders.filter(order => order.status === 'Confirmed');
  const deliveredOrders = orders.filter(order => order.status === 'Delivered');
  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);

  const handleConfirmOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Confirmed' as const } : order
    ));
  };

  const handleMarkDelivered = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        status: 'Delivered' as const,
        deliveryDate: new Date().toISOString().split('T')[0]
      } : order
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Manage purchase orders and deliveries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting confirmation
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{confirmedOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Being processed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{deliveredOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                All orders
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VendorOrdersChart orders={orders} />
        <DeliveryPerformanceChart orders={orders} />
      </div>

      {/* Orders Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Orders Requiring Action</CardTitle>
            <CardDescription>Confirm or update order status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...pendingOrders, ...confirmedOrders].map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{order.customerName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Amount: ${order.amount.toLocaleString()}
                    </p>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-600' :
                      'bg-blue-500/20 text-blue-600'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'Pending' && (
                      <Button
                        size="sm"
                        onClick={() => handleConfirmOrder(order.id)}
                      >
                        Confirm
                      </Button>
                    )}
                    {order.status === 'Confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkDelivered(order.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
              {[...pendingOrders, ...confirmedOrders].length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No orders requiring action
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>Recent delivery statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">On-time Deliveries</span>
                <span className="text-green-600 font-bold">95%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Average Delivery Time</span>
                <span className="font-bold">2.3 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Customer Satisfaction</span>
                <span className="text-green-600 font-bold">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}