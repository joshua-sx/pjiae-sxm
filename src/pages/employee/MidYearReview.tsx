
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
  accomplishments: z.string().min(10, 'Please provide at least 10 characters'),
  challenges: z.string().min(10, 'Please provide at least 10 characters'),
  nextSteps: z.string().min(10, 'Please provide at least 10 characters'),
  communicationRating: z.string().min(1, 'Please select a rating'),
  teamworkRating: z.string().min(1, 'Please select a rating'),
  technicalRating: z.string().min(1, 'Please select a rating'),
  leadershipRating: z.string().min(1, 'Please select a rating'),
});

type FormValues = z.infer<typeof formSchema>;

const EmployeeMidYearReview = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accomplishments: '',
      challenges: '',
      nextSteps: '',
      communicationRating: '',
      teamworkRating: '',
      technicalRating: '',
      leadershipRating: '',
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // In a real app, this would send data to an API
    console.log('Form values:', values);
    
    toast({
      title: 'Mid-Year Review submitted',
      description: 'Your self-assessment has been submitted successfully.',
      variant: 'success',
    });
  };
  
  const ratingOptions = ['1', '2', '3', '4', '5'];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mid-Year Self-Assessment</h1>
          <p className="text-muted-foreground mt-2">Reflect on your progress and performance</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Self-Assessment Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="accomplishments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Accomplishments</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your key accomplishments this period" 
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
                  name="challenges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenges Faced</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any challenges you've encountered" 
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
                  name="nextSteps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Next Steps & Development</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What are your next steps and development goals?" 
                          {...field} 
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Self-Rating</h3>
                  
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
                
                <div className="flex justify-end">
                  <Button type="submit">Submit Self-Assessment</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EmployeeMidYearReview;
