
import React from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { TextFieldsSection } from './TextFieldsSection';
import { RatingsSection } from './RatingsSection';
import { OverallPerformanceSection } from './OverallPerformanceSection';
import { finalReviewFormSchema, FinalReviewFormValues } from './formSchema';

export const FinalReviewForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<FinalReviewFormValues>({
    resolver: zodResolver(finalReviewFormSchema),
    defaultValues: {
      yearAccomplishments: '',
      yearChallenges: '',
      developmentPlan: '',
      futureGoals: '',
      communicationRating: '',
      teamworkRating: '',
      technicalRating: '',
      leadershipRating: '',
      overallPerformance: '',
    },
  });
  
  const onSubmit = (values: FinalReviewFormValues) => {
    // In a real app, this would send data to an API
    console.log('Form values:', values);
    
    toast({
      title: 'Final Review submitted',
      description: 'Your review has been submitted successfully.',
      variant: 'success',
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextFieldsSection form={form} />
        <RatingsSection form={form} />
        <OverallPerformanceSection form={form} />
        
        <div className="flex justify-end">
          <Button type="submit">Submit Final Assessment</Button>
        </div>
      </form>
    </Form>
  );
};
