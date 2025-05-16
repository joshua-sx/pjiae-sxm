
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Form schema
const formSchema = z.object({
  title: z.string().min(5, 'Goal title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  rationale: z.string().min(20, 'Please provide a detailed rationale (at least 20 characters)'),
  timeframe: z.string().min(5, 'Please specify a timeframe'),
});

type FormValues = z.infer<typeof formSchema>;

const ProposeGoal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      rationale: '',
      timeframe: '',
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // In a real app, this would send data to an API
    console.log('Form values:', values);
    
    toast({
      title: 'Goal proposal submitted',
      description: 'Your goal has been submitted for manager review.',
      variant: 'success',
    });
    
    navigate('/my-goals');
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Propose New Goal</h1>
          <p className="text-muted-foreground mt-2">Suggest a new goal for your professional development</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Goal Proposal Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a clear, concise title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what you want to achieve" 
                          {...field} 
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rationale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rationale</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Explain why this goal is important and how it aligns with department/company objectives" 
                          {...field} 
                          rows={4}
                        />
                      </FormControl>
                      <FormDescription>
                        Your manager will evaluate the goal based on this rationale
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proposed Timeframe</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 'By end of Q3' or 'Within 2 months'" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/my-goals')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Proposal</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProposeGoal;
