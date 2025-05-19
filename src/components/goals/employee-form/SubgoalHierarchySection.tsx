
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Goal } from './types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

interface SubgoalHierarchyProps {
  goals: Goal[];
  onAddSubgoal: (parentId?: string) => void;
  onUpdateGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: string) => void;
}

export const SubgoalHierarchySection: React.FC<SubgoalHierarchyProps> = ({ 
  goals, 
  onAddSubgoal, 
  onUpdateGoal, 
  onDeleteGoal 
}) => {
  const { toast } = useToast();

  // Function to create a default goal
  const defaultGoal = (): Goal => ({
    id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'New Goal',
    description: '',
    start: new Date(),
    end: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    children: [],
    rollUp: true
  });

  // Function to add a sub-goal to a parent goal
  const handleAddSubgoal = (parentId?: string) => {
    if (!parentId) {
      // Add top-level goal
      onAddSubgoal();
    } else {
      // Find parent goal recursively
      const findAndAddSubgoal = (goalsList: Goal[], id: string): boolean => {
        for (const goal of goalsList) {
          if (goal.id === id) {
            const child = defaultGoal();
            child.start = goal.start;
            child.end = goal.end;
            goal.children.push(child);
            onUpdateGoal(goal);
            return true;
          }
          if (goal.children && goal.children.length > 0) {
            if (findAndAddSubgoal(goal.children, id)) {
              return true;
            }
          }
        }
        return false;
      };

      if (!findAndAddSubgoal(goals, parentId)) {
        toast({
          title: "Error",
          description: "Could not find the parent goal to add the sub-goal.",
          variant: "destructive"
        });
      }
    }
  };

  // Function to delete a goal
  const handleDeleteGoal = (goalId: string) => {
    onDeleteGoal(goalId);
  };

  // Recursive component for rendering goals and their sub-goals
  const GoalItem = ({ goal, depth = 0 }: { goal: Goal; depth?: number }) => {
    return (
      <div className={`pl-${depth * 4} mb-2`}>
        <AccordionItem value={goal.id} className="border rounded-md mb-4">
          <AccordionTrigger className="px-4 py-2">
            {goal.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4">
              <Card className="mb-4">
                <CardContent className="pt-6">
                  <p className="text-sm font-medium">Owner: {goal.owner || 'Unassigned'}</p>
                  <p className="text-sm mt-2">
                    {goal.start.toLocaleDateString()} - {goal.end.toLocaleDateString()}
                  </p>
                  <p className="mt-2">{goal.description || 'No description'}</p>
                  <div className="flex mt-4 gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteGoal(goal.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Render children goals */}
              {goal.children && goal.children.map((childGoal) => (
                <GoalItem key={childGoal.id} goal={childGoal} depth={depth + 1} />
              ))}
              
              {/* Add Sub-Goal button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAddSubgoal(goal.id)}
                className="mb-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Sub-Goal
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal Hierarchy</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="mb-4">
          {goals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </Accordion>
        
        {goals.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No goals added yet.</p>
            <Button 
              onClick={() => handleAddSubgoal()}
              className="mx-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>
        )}
        
        {goals.length > 0 && (
          <Button 
            variant="default"
            onClick={() => handleAddSubgoal()}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Top-Level Goal
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
