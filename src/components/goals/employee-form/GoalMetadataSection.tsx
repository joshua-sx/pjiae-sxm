
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
import { type FormValues } from './types';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GoalMetadataSectionProps {
  control: Control<FormValues>;
  directReports: { id: string; name: string; }[];
}

export const GoalMetadataSection: React.FC<GoalMetadataSectionProps> = ({ 
  control, 
  directReports 
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
                <div className="border rounded-md p-2">
                  <FormItem className="flex items-center space-x-2 p-2 mb-2 border-b">
                    <Checkbox 
                      id="select-all" 
                      checked={directReports.length > 0 && field.value.length === directReports.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          // Select all
                          field.onChange(directReports.map(employee => employee.id));
                        } else {
                          // Deselect all
                          field.onChange([]);
                        }
                      }}
                    />
                    <label htmlFor="select-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Select All Employees
                    </label>
                  </FormItem>
                  <ScrollArea className="h-52">
                    <div className="space-y-2 p-2">
                      {directReports.map((employee) => (
                        <FormItem
                          key={employee.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox 
                            id={`employee-${employee.id}`}
                            checked={field.value.includes(employee.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, employee.id]);
                              } else {
                                field.onChange(field.value.filter(id => id !== employee.id));
                              }
                            }}
                          />
                          <label htmlFor={`employee-${employee.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {employee.name}
                          </label>
                        </FormItem>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
