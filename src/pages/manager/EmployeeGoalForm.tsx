
import React, { useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Mock direct reports
const directReports = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Jane Doe' },
  { id: '3', name: 'Mark Johnson' },
];

// Form schema
const formSchema = z.object({
  title: z.string().min(5, 'Goal title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  specific: z.string().min(10, 'Specific criteria must be at least 10 characters'),
  measurable: z.string().min(10, 'Measurable criteria must be at least 10 characters'),
  achievable: z.string().min(10, 'Achievable criteria must be at least 10 characters'),
  relevant: z.string().min(10, 'Relevant criteria must be at least 10 characters'),
  timeBound: z.string().min(10, 'Time-bound criteria must be at least 10 characters'),
  assigneeId: z.string().min(1, 'Please select an assignee'),
});

type FormValues = z.infer<typeof formSchema>;

const EmployeeGoalForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      specific: '',
      measurable: '',
      achievable: '',
      relevant: '',
      timeBound: '',
      assigneeId: '',
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // In a real app, this would send data to an API
    console.log('Form values:', values);
    
    toast({
      title: 'Goal created',
      description: 'The employee goal has been created successfully.',
      variant: 'success',
    });
    
    navigate('/employee-goals');
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Employee Goal</h1>
          <p className="text-muted-foreground mt-2">Set a new goal for your direct reports</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter goal title" {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear, concise title for the goal
                  </FormDescription>
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
                    <Textarea placeholder="Describe the goal in detail" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SMART Criteria</h3>
              
              <FormField
                control={form.control}
                name="specific"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What exactly needs to be accomplished?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="measurable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurable</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How will progress and success be measured?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="achievable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achievable</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Is this goal realistic given available resources?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="relevant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How does this align with broader objectives?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timeBound"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time-bound</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What's the timeline for completion?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {directReports.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit">Create Goal</Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default EmployeeGoalForm;
