import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateInvoicePDF } from '@/utils/pdfGenerator';
import { useTheme } from '@/contexts/ThemeContext';

interface Order {
  id: string;
  customerName: string;
  SP: number;
  CP: number;
  profit: number;
  profitPercentage: number;
  status: string;
  createdAt: string;
}

interface OrderListProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (orderId: string) => void;
  canEdit?: boolean;
  showActions?: boolean;
}

export function OrderList({ 
  orders, 
  onEdit, 
  onDelete, 
  canEdit = true, 
  showActions = true 
}: OrderListProps) {
  const { theme } = useTheme();

  const handleDownloadInvoice = (order: Order) => {
    generateInvoicePDF(order, theme);
  };

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Orders</CardTitle>
        <CardDescription>
          {canEdit ? 'Manage your sales orders' : 'View all sales orders'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4"
            >
              <div className="flex-1">
                <h3 className="font-medium text-lg">{order.customerName}</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">SP: </span>
                    <span className="font-medium">${order.SP}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CP: </span>
                    <span className="font-medium">${order.CP}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Profit: </span>
                    <span className={`font-medium ${order.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${order.profit}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Margin: </span>
                    <span className={`font-medium ${order.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {order.profitPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date: </span>
                    <span className="font-medium">{order.createdAt}</span>
                  </div>
                </div>
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  order.status === 'Approved' ? 'bg-green-500/20 text-green-600' :
                  order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-600' :
                  order.status === 'Rejected' ? 'bg-red-500/20 text-red-600' :
                  'bg-blue-500/20 text-blue-600'
                }`}>
                  {order.status}
                </div>
              </div>
              
              {showActions && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadInvoice(order)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                  {canEdit && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(order)}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(order.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          ))}
          {orders.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No orders found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}