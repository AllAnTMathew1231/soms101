import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Order {
  id: string;
  customerName: string;
  profit: number;
}

interface ProfitChartProps {
  orders: Order[];
}

export function ProfitChart({ orders }: ProfitChartProps) {
  const profitData = orders.map(order => ({
    customer: order.customerName.length > 10 
      ? order.customerName.substring(0, 10) + '...' 
      : order.customerName,
    profit: order.profit
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit per Order</CardTitle>
        <CardDescription>
          Individual order profitability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="customer" 
              className="text-muted-foreground"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
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
            <Bar 
              dataKey="profit" 
              fill="#10b981" 
              name="Profit ($)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}