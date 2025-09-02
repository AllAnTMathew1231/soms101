import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function OrderForm({ onSubmit, onCancel, initialData }: OrderFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [SP, setSP] = useState('');
  const [CP, setCP] = useState('');
  const [profit, setProfit] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);

  useEffect(() => {
    if (initialData) {
      setCustomerName(initialData.customerName);
      setSP(initialData.SP.toString());
      setCP(initialData.CP.toString());
    }
  }, [initialData]);

  useEffect(() => {
    const spValue = parseFloat(SP) || 0;
    const cpValue = parseFloat(CP) || 0;
    const calculatedProfit = spValue - cpValue;
    const calculatedProfitPercentage = spValue > 0 ? (calculatedProfit / spValue) * 100 : 0;
    
    setProfit(calculatedProfit);
    setProfitPercentage(calculatedProfitPercentage);
  }, [SP, CP]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerName,
      SP: parseFloat(SP),
      CP: parseFloat(CP),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {initialData ? 'Edit Sales Order' : 'Create Sales Order'}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sp">Selling Price ($)</Label>
                  <Input
                    id="sp"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={SP}
                    onChange={(e) => setSP(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cp">Cost Price ($)</Label>
                  <Input
                    id="cp"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={CP}
                    onChange={(e) => setCP(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Profit Calculation Display */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profit:</span>
                  <span className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${profit.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profit Margin:</span>
                  <span className={`font-medium ${profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {profitPercentage.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {initialData ? 'Update Order' : 'Create Order'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}