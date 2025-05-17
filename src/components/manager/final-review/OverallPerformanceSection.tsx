
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FinalReviewFormValues } from './formSchema';

interface OverallPerformanceSectionProps {
  form: UseFormReturn<FinalReviewFormValues>;
}

export const OverallPerformanceSection: React.FC<OverallPerformanceSectionProps> = ({ form }) => {
  const overallOptions = ['Exceeds Expectations', 'Meets Expectations', 'Partially Meets Expectations', 'Does Not Meet Expectations'];
  
  return (
    <FormField
      control={form.control}
      name="overallPerformance"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Overall Performance Assessment</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an assessment" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {overallOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
