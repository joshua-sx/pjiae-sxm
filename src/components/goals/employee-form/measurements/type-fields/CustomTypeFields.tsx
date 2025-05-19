
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CustomTypeFieldsProps {
  expression: string;
  setExpression: (value: string) => void;
}

export const CustomTypeFields: React.FC<CustomTypeFieldsProps> = ({
  expression,
  setExpression,
}) => {
  return (
    <div className="border-t pt-4">
      <Label htmlFor="expression">Custom Expression</Label>
      <Textarea
        id="expression"
        placeholder="e.g., (x > 90) ? 5 : (x > 70) ? 4 : 3"
        rows={3}
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
      />
      <p className="text-sm text-muted-foreground mt-1">
        Define a custom formula for calculating the score. Use variables, comparisons, and math operations.
        <br />
        Available variables: <code>x</code> (actual value), <code>target</code> (target value).
      </p>
    </div>
  );
};
