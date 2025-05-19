
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { FormulaEditor } from '@/components/goals/FormulaEditor';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { type Control } from 'react-hook-form';
import { type FormValues, type Subgoal } from './types';

interface FormulaSectionProps {
  control: Control<FormValues>;
  subgoals: Subgoal[];
}

export const FormulaSection: React.FC<FormulaSectionProps> = ({ control, subgoals }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Final Scoring Formula</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="formulaExpression"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Formula Expression</FormLabel>
              <FormControl>
                <FormulaEditor 
                  value={field.value} 
                  onChange={field.onChange} 
                  subgoals={subgoals}
                />
              </FormControl>
              <FormDescription>
                Use M1, M2, etc. to reference measurements in your formula
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
