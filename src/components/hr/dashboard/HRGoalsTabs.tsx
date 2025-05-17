
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HRGoalsList } from "./HRGoalsList";
import { DepartmentGoal } from "@/types/goals";

interface HRGoalsTabsProps {
  submittedGoals: DepartmentGoal[];
  flaggedGoals: DepartmentGoal[];
  approvedGoals: DepartmentGoal[];
  onSetDeadline: (goalId: string) => void;
  onViewGoal: (goalId: string) => void;
}

export const HRGoalsTabs = ({ 
  submittedGoals, 
  flaggedGoals, 
  approvedGoals, 
  onSetDeadline, 
  onViewGoal 
}: HRGoalsTabsProps) => {
  return (
    <Tabs defaultValue="pending" className="mb-6">
      <TabsList className="mb-4">
        <TabsTrigger value="pending">Pending Review</TabsTrigger>
        <TabsTrigger value="flagged">Flagged</TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending">
        <HRGoalsList 
          goals={submittedGoals} 
          type="pending"
          onSetDeadline={onSetDeadline}
          onViewGoal={onViewGoal}
        />
      </TabsContent>
      
      <TabsContent value="flagged">
        <HRGoalsList 
          goals={flaggedGoals} 
          type="flagged"
          onSetDeadline={onSetDeadline}
          onViewGoal={onViewGoal}
        />
      </TabsContent>
      
      <TabsContent value="approved">
        <HRGoalsList 
          goals={approvedGoals} 
          type="approved"
          onSetDeadline={onSetDeadline}
          onViewGoal={onViewGoal}
        />
      </TabsContent>
    </Tabs>
  );
};
