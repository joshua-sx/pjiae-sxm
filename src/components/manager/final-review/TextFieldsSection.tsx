
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { FinalReviewFormValues } from './formSchema';

interface TextFieldsSectionProps {
  form: UseFormReturn<FinalReviewFormValues>;
}

export const TextFieldsSection: React.FC<TextFieldsSectionProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="yearAccomplishments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year's Key Accomplishments</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Summarize your key accomplishments this year" 
                {...field} 
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="yearChallenges"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year's Challenges</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe significant challenges you faced this year" 
                {...field} 
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="developmentPlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Development Plan Progress</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe progress on your development plan" 
                {...field} 
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="futureGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Goals for Next Year</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What are your goals for the coming year?" 
                {...field} 
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
