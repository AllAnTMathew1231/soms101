import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Order {
  id: string;
  customerName: string;
  SP: number;
  CP: number;
  profit: number;
  createdAt: string;
}

interface SalesChartProps {
  orders: Order[];
}

export function SalesChart({ orders }: SalesChartProps) {
  // Process data for monthly sales vs cost
  const monthlyData = orders.reduce((acc: any, order) => {
    const month = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short' });
    const existingMonth = acc.find((item: any) => item.month === month);
    
    if (existingMonth) {
      existingMonth.sales += order.SP;
      existingMonth.cost += order.CP;
    } else {
      acc.push({
        month,
        sales: order.SP,
        cost: order.CP
      });
    }
    
    return acc;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales vs Cost</CardTitle>
        <CardDescription>
          Compare sales revenue and cost over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Bar dataKey="sales" fill="#3b82f6" name="Sales" radius={[2, 2, 0, 0]} />
            <Bar dataKey="cost" fill="#ef4444" name="Cost" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}