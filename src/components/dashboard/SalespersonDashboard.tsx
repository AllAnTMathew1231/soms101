import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, DollarSign, Package, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderForm } from '@/components/orders/OrderForm';
import { OrderList } from '@/components/orders/OrderList';
import { SalesChart } from '@/components/charts/SalesChart';
import { ProfitChart } from '@/components/charts/ProfitChart';
import { ProfitDistributionChart } from '@/components/charts/ProfitDistributionChart';

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

export function SalespersonDashboard() {
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<SalesOrder | null>(null);

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
        status: 'Approved',
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
        status: 'Delivered',
        createdAt: '2024-01-17'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.SP, 0);
  const totalProfit = orders.reduce((sum, order) => sum + order.profit, 0);
  const avgProfitPercentage = orders.length > 0 
    ? orders.reduce((sum, order) => sum + order.profitPercentage, 0) / orders.length 
    : 0;

  const handleOrderSubmit = (orderData: any) => {
    const profit = orderData.SP - orderData.CP;
    const profitPercentage = (profit / orderData.SP) * 100;
    
    const newOrder: SalesOrder = {
      id: Date.now().toString(),
      ...orderData,
      profit,
      profitPercentage,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (editingOrder) {
      setOrders(orders.map(order => 
        order.id === editingOrder.id ? { ...newOrder, id: editingOrder.id } : order
      ));
      setEditingOrder(null);
    } else {
      setOrders([...orders, newOrder]);
    }
    setShowOrderForm(false);
  };

  const handleEdit = (order: SalesOrder) => {
    setEditingOrder(order);
    setShowOrderForm(true);
  };

  const handleDelete = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
          <p className="text-muted-foreground">Manage your sales orders and track performance</p>
        </div>
        <Button 
          onClick={() => setShowOrderForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Order
        </Button>
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
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
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
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
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
              <CardTitle className="text-sm font-medium">Avg Profit %</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgProfitPercentage.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
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
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                +3 new this week
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart orders={orders} />
        <ProfitChart orders={orders} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitDistributionChart orders={orders} />
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      Profit: ${order.profit} ({order.profitPercentage.toFixed(1)}%)
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Approved' ? 'bg-green-500/20 text-green-600' :
                    order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-600' :
                    'bg-blue-500/20 text-blue-600'
                  }`}>
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <OrderList 
        orders={orders} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        canEdit={true}
      />

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          onSubmit={handleOrderSubmit}
          onCancel={() => {
            setShowOrderForm(false);
            setEditingOrder(null);
          }}
          initialData={editingOrder}
        />
      )}
    </div>
  );
}