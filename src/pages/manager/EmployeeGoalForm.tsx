
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
import { SubgoalCreationSection } from '@/components/goals/employee-form/SubgoalCreationSection';
import { SubgoalHierarchySection } from '@/components/goals/employee-form/SubgoalHierarchySection';
import { FormulaSection } from '@/components/goals/employee-form/FormulaSection';
import { FormActions } from '@/components/goals/employee-form/FormActions';
import { formSchema, type FormValues, type Subgoal, type Goal, directReports } from '@/components/goals/employee-form/types';

const EmployeeGoalForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [subgoals, setSubgoals] = useState<Subgoal[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  
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
      goals, // Include the hierarchical goals structure
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

  // Create a default goal
  const defaultGoal = (): Goal => ({
    id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'New Goal',
    description: '',
    start: new Date(),
    end: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    children: [],
    rollUp: true
  });

  // Add a top-level goal
  const handleAddTopLevelGoal = () => {
    setGoals(prevGoals => [...prevGoals, defaultGoal()]);
  };

  // Update a goal in the hierarchy
  const handleUpdateGoal = (updatedGoal: Goal) => {
    const updateGoalInTree = (goalsList: Goal[], goalToUpdate: Goal): Goal[] => {
      return goalsList.map(goal => {
        if (goal.id === goalToUpdate.id) {
          return goalToUpdate;
        }
        if (goal.children && goal.children.length > 0) {
          return {
            ...goal,
            children: updateGoalInTree(goal.children, goalToUpdate)
          };
        }
        return goal;
      });
    };

    setGoals(prevGoals => updateGoalInTree(prevGoals, updatedGoal));
  };

  // Delete a goal from the hierarchy
  const handleDeleteGoal = (goalId: string) => {
    const deleteGoalFromTree = (goalsList: Goal[], idToDelete: string): Goal[] => {
      return goalsList.filter(goal => {
        if (goal.id === idToDelete) {
          return false;
        }
        if (goal.children && goal.children.length > 0) {
          goal.children = deleteGoalFromTree(goal.children, idToDelete);
        }
        return true;
      });
    };

    setGoals(prevGoals => deleteGoalFromTree(prevGoals, goalId));
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
            
            {/* Sub-goal Hierarchy Section */}
            <SubgoalHierarchySection 
              goals={goals} 
              onAddSubgoal={handleAddTopLevelGoal}
              onUpdateGoal={handleUpdateGoal}
              onDeleteGoal={handleDeleteGoal}
            />
            
            <SubgoalCreationSection onAddSubgoal={handleAddSubgoal} />
            
            {subgoals.length > 0 && (
              <SubgoalsSection
                subgoals={subgoals}
                onSubgoalsChange={handleSubgoalsChange}
              />
            )}
            
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
