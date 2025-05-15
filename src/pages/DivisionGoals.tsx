
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import DivisionGoalsTable from '@/components/goals/DivisionGoalsTable';
import FlagCommentDialog from '@/components/goals/FlagCommentDialog';
import ApproveGoalDialog from '@/components/goals/ApproveGoalDialog';
import { toast } from '@/components/ui/use-toast';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { useDivisionGoals } from '@/hooks/useDivisionGoals';

const DivisionGoals = () => {
  const { role } = useAuth();
  const isHROrIT = role === 'HR Officer' || role === 'IT Admin';
  const isReadOnly = role === 'IT Admin';
  
  // Use our custom hook for division goals
  const {
    filteredGoals,
    divisionFilter,
    setDivisionFilter,
    yearFilter,
    setYearFilter,
    parentDivisions,
    availableYears,
    sortColumn,
    sortDirection,
    handleSort
  } = useDivisionGoals();

  // State for dialogs
  const [selectedGoal, setSelectedGoal] = useState<UnifiedGoal | null>(null);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  
  // Handle flag goal action
  const handleFlagGoal = (goal: UnifiedGoal) => {
    setSelectedGoal(goal);
    setIsFlagDialogOpen(true);
  };
  
  // Handle approve goal action - opens the approval dialog
  const handleApproveGoalClick = (goal: UnifiedGoal) => {
    setSelectedGoal(goal);
    setIsApproveDialogOpen(true);
  };
  
  // Handle flag submit
  const handleFlagSubmit = (comment: string) => {
    // In a real app, this would send the flag comment to the API
    toast({
      title: "Goal Flagged",
      description: `The goal "${selectedGoal?.title}" has been flagged for review.`,
    });
    setIsFlagDialogOpen(false);
  };
  
  // Handle approve submit - confirms the approval
  const handleApproveConfirm = () => {
    // In a real app, this would update the goal status in the database
    toast({
      title: "Goal Approved",
      description: `The goal "${selectedGoal?.title}" has been approved.`,
    });
    setIsApproveDialogOpen(false);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Division Goals</h1>
          <p className="text-muted-foreground mt-2">
            {isReadOnly 
              ? 'View division-level goals and their progress' 
              : 'Manage and track division-level strategic goals'}
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="w-64">
            <label className="text-sm font-medium mb-1 block">Division</label>
            <Select 
              value={divisionFilter} 
              onValueChange={setDivisionFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                {parentDivisions.map((division) => (
                  <SelectItem key={division.id} value={division.id}>
                    {division.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-64">
            <label className="text-sm font-medium mb-1 block">Year</label>
            <Select 
              value={yearFilter} 
              onValueChange={setYearFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Goals Table */}
        <Card>
          <CardContent className="pt-6">
            {filteredGoals.length > 0 ? (
              <DivisionGoalsTable 
                goals={filteredGoals} 
                onFlagGoal={handleFlagGoal}
                onApproveGoal={handleApproveGoalClick}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  No division goals found matching your filters.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Flag Dialog */}
      {selectedGoal && (
        <FlagCommentDialog
          isOpen={isFlagDialogOpen}
          onClose={() => setIsFlagDialogOpen(false)}
          onSubmit={handleFlagSubmit}
          goalTitle={selectedGoal.title}
        />
      )}
      
      {/* Approve Dialog */}
      {selectedGoal && (
        <ApproveGoalDialog
          isOpen={isApproveDialogOpen}
          onClose={() => setIsApproveDialogOpen(false)}
          onConfirm={handleApproveConfirm}
          goalTitle={selectedGoal.title}
        />
      )}
    </MainLayout>
  );
};

export default DivisionGoals;
