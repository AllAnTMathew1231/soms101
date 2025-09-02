import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Order {
  createdAt: string;
  status: string;
}

interface DeliveryPerformanceChartProps {
  orders: Order[];
}

export function DeliveryPerformanceChart({ orders }: DeliveryPerformanceChartProps) {
  // Mock delivery performance data
  const performanceData = [
    { week: 'Week 1', onTime: 95, late: 5 },
    { week: 'Week 2', onTime: 92, late: 8 },
    { week: 'Week 3', onTime: 97, late: 3 },
    { week: 'Week 4', onTime: 94, late: 6 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Performance</CardTitle>
        <CardDescription>
          Weekly delivery performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="week" 
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
            <Line 
              type="monotone" 
              dataKey="onTime" 
              stroke="#10b981" 
              strokeWidth={3}
              name="On Time %" 
            />
            <Line 
              type="monotone" 
              dataKey="late" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Late %" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}