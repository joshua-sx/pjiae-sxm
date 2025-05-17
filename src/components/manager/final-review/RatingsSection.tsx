
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FinalReviewFormValues } from './formSchema';

interface RatingsSectionProps {
  form: UseFormReturn<FinalReviewFormValues>;
}

export const RatingsSection: React.FC<RatingsSectionProps> = ({ form }) => {
  const ratingOptions = ['1', '2', '3', '4', '5'];
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Core Competencies Self-Rating</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="communicationRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Communication</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate 1-5" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ratingOptions.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="teamworkRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teamwork</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate 1-5" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ratingOptions.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="technicalRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technical Skills</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate 1-5" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ratingOptions.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="leadershipRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leadership</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate 1-5" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ratingOptions.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
