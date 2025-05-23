
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Import refactored components
import { GoalMetadataSection } from '@/components/goals/employee-form/GoalMetadataSection';
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
      assigneeIds: [],
      formulaExpression: '',
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // Combine form values with subgoals (which are now optional)
    const payload = {
      ...values,
      subgoals, // This can now be empty if no subgoals are defined
    };
    
    // Log the full payload for development/testing
    console.log('Goal submission payload:', payload);
    
    // Update toast message to reflect the number of employees assigned
    const assigneeCount = values.assigneeIds.length;
    const assigneeNames = values.assigneeIds.map(id => 
      directReports.find(employee => employee.id === id)?.name || id
    );
    
    let assigneeText = `${assigneeCount} employee(s)`;
    if (assigneeCount === 1) {
      assigneeText = assigneeNames[0];
    } else if (assigneeCount <= 3) {
      assigneeText = assigneeNames.join(', ');
    }
    
    toast({
      title: 'Goal created',
      description: `The employee goal has been assigned to ${assigneeText}.`,
      variant: 'success',
    });
    
    navigate('/employee-goals');
  };

  const handleAddSubgoal = (newSubgoal: Subgoal) => {
    setSubgoals(prevSubgoals => [...prevSubgoals, newSubgoal]);
    console.log('New measurement added:', newSubgoal);
  };

  const handleSubgoalsChange = (newSubgoals: Subgoal[]) => {
    setSubgoals(newSubgoals);
    console.log('Measurements updated:', newSubgoals);
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
            <GoalMetadataSection 
              control={form.control} 
              directReports={directReports}
              subgoals={subgoals}
              onAddSubgoal={handleAddSubgoal}
              onSubgoalsChange={handleSubgoalsChange} 
            />
            
            {subgoals.length > 0 && (
              <FormulaSection 
                control={form.control}
                subgoals={subgoals}
              />
            )}
            
            <FormActions />
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default EmployeeGoalForm;
