
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Import refactored components
import { GoalMetadataSection } from '@/components/goals/employee-form/GoalMetadataSection';
import { SubgoalsSection } from '@/components/goals/employee-form/SubgoalsSection';
import { FormulaSection } from '@/components/goals/employee-form/FormulaSection';
import { FormActions } from '@/components/goals/employee-form/FormActions';
import { formSchema, type FormValues, type Subgoal, directReports } from '@/components/goals/employee-form/types';

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
            <GoalMetadataSection control={form.control} directReports={directReports} />
            
            <SubgoalsSection
              subgoals={subgoals}
              onSubgoalsChange={handleSubgoalsChange}
            />
            
            <FormulaSection 
              control={form.control}
              subgoals={subgoals}
            />
            
            <FormActions />
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default EmployeeGoalForm;
