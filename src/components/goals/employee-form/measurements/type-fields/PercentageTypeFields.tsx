
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PercentageTypeFieldsProps {
  operator: '≥' | '≤' | '=' | 'range';
  setOperator: (value: '≥' | '≤' | '=' | 'range') => void;
  targetPercentage: string;
  setTargetPercentage: (value: string) => void;
}

export const PercentageTypeFields: React.FC<PercentageTypeFieldsProps> = ({
  operator,
  setOperator,
  targetPercentage,
  setTargetPercentage,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 border-t pt-4">
      <div>
        <Label htmlFor="percentage-operator">Operator</Label>
        <Select value={operator} onValueChange={(value) => setOperator(value as '≥' | '≤' | '=' | 'range')}>
          <SelectTrigger id="percentage-operator">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="≥">≥ (Greater than or equal)</SelectItem>
            <SelectItem value="≤">≤ (Less than or equal)</SelectItem>
            <SelectItem value="=">=</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="target-percentage">Target Percentage (%)</Label>
        <Input
          id="target-percentage"
          type="number"
          min="0"
          max="100"
          value={targetPercentage}
          onChange={(e) => setTargetPercentage(e.target.value)}
        />
      </div>
    </div>
  );
};
