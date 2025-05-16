
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Form schema
const formSchema = z.object({
  yearAccomplishments: z.string().min(10, 'Please provide at least 10 characters'),
  yearChallenges: z.string().min(10, 'Please provide at least 10 characters'),
  developmentPlan: z.string().min(10, 'Please provide at least 10 characters'),
  futureGoals: z.string().min(10, 'Please provide at least 10 characters'),
  communicationRating: z.string().min(1, 'Please select a rating'),
  teamworkRating: z.string().min(1, 'Please select a rating'),
  technicalRating: z.string().min(1, 'Please select a rating'),
  leadershipRating: z.string().min(1, 'Please select a rating'),
  overallPerformance: z.string().min(1, 'Please select a rating'),
});

type FormValues = z.infer<typeof formSchema>;

const ManagerFinalReview = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
  
  const onSubmit = (values: FormValues) => {
    // In a real app, this would send data to an API
    console.log('Form values:', values);
    
    toast({
      title: 'Final Review submitted',
      description: 'Your review has been submitted successfully.',
      variant: 'success',
    });
  };
  
  const ratingOptions = ['1', '2', '3', '4', '5'];
  const overallOptions = ['Exceeds Expectations', 'Meets Expectations', 'Partially Meets Expectations', 'Does Not Meet Expectations'];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Final Year Assessment</h1>
          <p className="text-muted-foreground mt-2">Complete your year-end self-assessment</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Final Assessment Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                
                <div className="flex justify-end">
                  <Button type="submit">Submit Final Assessment</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ManagerFinalReview;
