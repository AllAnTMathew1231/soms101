import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Order {
  profitPercentage: number;
}

interface ProfitDistributionChartProps {
  orders: Order[];
}

export function ProfitDistributionChart({ orders }: ProfitDistributionChartProps) {
  // Categorize profit percentages
  const categories = [
    { name: 'High (>40%)', value: 0, color: '#10b981' },
    { name: 'Medium (20-40%)', value: 0, color: '#3b82f6' },
    { name: 'Low (<20%)', value: 0, color: '#ef4444' }
  ];

  orders.forEach(order => {
    if (order.profitPercentage > 40) {
      categories[0].value++;
    } else if (order.profitPercentage >= 20) {
      categories[1].value++;
    } else {
      categories[2].value++;
    }
  });

  const data = categories.filter(category => category.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit Margin Distribution</CardTitle>
        <CardDescription>
          Breakdown of orders by profit margin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => 
                `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}