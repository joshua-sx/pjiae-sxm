
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CurrencyTypeFieldsProps {
  currencyCode: string;
  setCurrencyCode: (value: string) => void;
  operator: '≥' | '≤' | '=' | 'range';
  setOperator: (value: '≥' | '≤' | '=' | 'range') => void;
  minValue: string;
  setMinValue: (value: string) => void;
  maxValue: string;
  setMaxValue: (value: string) => void;
  amountValue: string;
  setAmountValue: (value: string) => void;
}

export const CurrencyTypeFields: React.FC<CurrencyTypeFieldsProps> = ({
  currencyCode,
  setCurrencyCode,
  operator,
  setOperator,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  amountValue,
  setAmountValue,
}) => {
  return (
    <div className="grid gap-4 border-t pt-4">
      <div>
        <Label htmlFor="currency-code">Currency</Label>
        <Select value={currencyCode} onValueChange={setCurrencyCode}>
          <SelectTrigger id="currency-code">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="$">USD ($)</SelectItem>
            <SelectItem value="€">EUR (€)</SelectItem>
            <SelectItem value="£">GBP (£)</SelectItem>
            <SelectItem value="¥">JPY (¥)</SelectItem>
            <SelectItem value="₹">INR (₹)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="currency-operator">Operator</Label>
        <Select value={operator} onValueChange={(value) => setOperator(value as '≥' | '≤' | '=' | 'range')}>
          <SelectTrigger id="currency-operator">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="≥">≥ (Greater than or equal)</SelectItem>
            <SelectItem value="≤">≤ (Less than or equal)</SelectItem>
            <SelectItem value="=">=</SelectItem>
            <SelectItem value="range">Range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {operator === 'range' ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="min-value">Minimum Value</Label>
            <Input
              id="min-value"
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="max-value">Maximum Value</Label>
            <Input
              id="max-value"
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
          <Label htmlFor="amount-value">Amount</Label>
          <Input
            id="amount-value"
            type="number"
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
