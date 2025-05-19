
import React, { useState } from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { type Control } from 'react-hook-form';
import { type FormValues, type Subgoal } from './types';
import { EmployeeCombobox } from './EmployeeCombobox';
import { MeasurementsSection } from './measurements/MeasurementsSection';

interface GoalMetadataSectionProps {
  control: Control<FormValues>;
  directReports: { id: string; name: string; }[];
  subgoals: Subgoal[];
  onAddSubgoal: (subgoal: Subgoal) => void;
  onSubgoalsChange: (subgoals: Subgoal[]) => void;
}

export const GoalMetadataSection: React.FC<GoalMetadataSectionProps> = ({ 
  control, 
  directReports,
  subgoals,
  onAddSubgoal,
  onSubgoalsChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Increase customer satisfaction by 15%" />
                </FormControl>
                <FormDescription>
                  A clear, concise title for the goal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Provide more context and details about the goal" 
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="assigneeIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignees</FormLabel>
                <FormDescription>
                  Select one or more employees responsible for achieving this goal
                </FormDescription>
                <FormControl>
                  <EmployeeCombobox
                    employees={directReports}
                    selectedEmployees={field.value}
                    onEmployeeSelect={(employeeIds) => field.onChange(employeeIds)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>

      {/* Measurements section */}
      <MeasurementsSection 
        subgoals={subgoals}
        onAddSubgoal={onAddSubgoal}
        onSubgoalsChange={onSubgoalsChange}
      />
    </Card>
  );
};
