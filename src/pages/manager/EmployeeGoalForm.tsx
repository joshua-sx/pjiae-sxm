
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
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { EnhancedTextarea } from '@/components/ui/enhanced-textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SubgoalList } from '@/components/goals/SubgoalList';
import { FormulaEditor } from '@/components/goals/FormulaEditor';

// Mock direct reports
const directReports = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Jane Doe' },
  { id: '3', name: 'Mark Johnson' },
];

// Form schema
const formSchema = z.object({
  title: z.string().min(5, 'Goal title must be at least 5 characters'),
  description: z.string().optional(),
  assigneeId: z.string().min(1, 'Please select an assignee'),
  formulaExpression: z.string().min(5, 'Please provide a formula for final scoring'),
});

type FormValues = z.infer<typeof formSchema>;

// Subgoal type definition
export type Subgoal = {
  id: string;
  name: string;
  type: 'number' | 'currency' | 'percentage' | 'date' | 'binary' | 'custom';
  unit: string;
  weight: number;
  config: {
    min?: number;
    max?: number;
    trueScore?: number;
    falseScore?: number;
    targetDate?: Date;
    expression?: string;
  };
};

const EmployeeGoalForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [subgoals, setSubgoals] = useState<Subgoal[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      assigneeId: '',
      formulaExpression: '',
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // Combine form values with subgoals
    const payload = {
      ...values,
      subgoals,
    };
    
    // Log the full payload for development/testing
    console.log('Goal submission payload:', payload);
    
    toast({
      title: 'Goal created',
      description: 'The employee goal has been created successfully.',
      variant: 'success',
    });
    
    navigate('/employee-goals');
  };

  const handleSubgoalsChange = (newSubgoals: Subgoal[]) => {
    setSubgoals(newSubgoals);
    console.log('Subgoals updated:', newSubgoals);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Employee Goal</h1>
          <p className="text-muted-foreground mt-2">
            Define a SMART goal for your direct reports using the standardized format
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Goal Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subgoals & Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <SubgoalList 
                  subgoals={subgoals} 
                  onChange={handleSubgoalsChange} 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Final Scoring Formula</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="formulaExpression"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formula Expression</FormLabel>
                      <FormControl>
                        <FormulaEditor 
                          value={field.value} 
                          onChange={field.onChange} 
                          subgoals={subgoals}
                        />
                      </FormControl>
                      <FormDescription>
                        Use M1, M2, etc. to reference measurements in your formula
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/employee-goals')}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Goal</Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default EmployeeGoalForm;
