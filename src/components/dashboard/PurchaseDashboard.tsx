import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderList } from '@/components/orders/OrderList';
import { ApprovalChart } from '@/components/charts/ApprovalChart';
import { VendorPerformanceChart } from '@/components/charts/VendorPerformanceChart';

interface SalesOrder {
  id: string;
  customerName: string;
  SP: number;
  CP: number;
  profit: number;
  profitPercentage: number;
  status: string;
  createdAt: string;
}

export function PurchaseDashboard() {
  const [orders, setOrders] = useState<SalesOrder[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockOrders: SalesOrder[] = [
      {
        id: '1',
        customerName: 'Acme Corp',
        SP: 1500,
        CP: 1000,
        profit: 500,
        profitPercentage: 33.33,
        status: 'Pending',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        customerName: 'Tech Solutions',
        SP: 2200,
        CP: 1400,
        profit: 800,
        profitPercentage: 36.36,
        status: 'Pending',
        createdAt: '2024-01-16'
      },
      {
        id: '3',
        customerName: 'Global Industries',
        SP: 3000,
        CP: 1800,
        profit: 1200,
        profitPercentage: 40,
        status: 'Approved',
        createdAt: '2024-01-17'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const pendingOrders = orders.filter(order => order.status === 'Pending');
  const approvedOrders = orders.filter(order => order.status === 'Approved');
  const rejectedOrders = orders.filter(order => order.status === 'Rejected');

  const handleApproveOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Approved' } : order
    ));
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Rejected' } : order
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Purchase Department</h1>
        <p className="text-muted-foreground">Review and approve sales orders</p>
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
                Awaiting approval
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
              <CardTitle className="text-sm font-medium">Approved Orders</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                This month
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
              <CardTitle className="text-sm font-medium">Rejected Orders</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{rejectedOrders.length}</div>
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
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${approvedOrders.reduce((sum, order) => sum + order.profit, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                From approved orders
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApprovalChart orders={orders} />
        <VendorPerformanceChart />
      </div>

      {/* Pending Orders for Approval */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Pending Approval</CardTitle>
          <CardDescription>
            Review and approve or reject sales orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{order.customerName}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm text-muted-foreground">
                    <span>SP: ${order.SP}</span>
                    <span>CP: ${order.CP}</span>
                    <span>Profit: ${order.profit}</span>
                    <span>Margin: {order.profitPercentage.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleApproveOrder(order.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRejectOrder(order.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </motion.div>
            ))}
            {pendingOrders.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No pending orders to review
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Orders */}
      <OrderList 
        orders={orders} 
        onEdit={() => {}} 
        onDelete={() => {}}
        canEdit={false}
        showActions={false}
      />
    </div>
  );
}