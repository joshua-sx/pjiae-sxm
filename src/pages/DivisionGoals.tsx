
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { useDepartmentGoalsQuery } from '@/hooks/useDepartmentGoalsQuery';
import { useDivisionGoals } from '@/hooks/useDivisionGoals';
import DivisionGoalsFilters from '@/components/divisions/DivisionGoalsFilters';
import DivisionGoalsContent from '@/components/divisions/DivisionGoalsContent';
import DivisionGoalsDialogs from '@/components/divisions/DivisionGoalsDialogs';

const DivisionGoals = () => {
  const { role } = useAuth();
  const isHROrIT = role === 'HR Officer' || role === 'IT Admin';
  const isReadOnly = role === 'IT Admin';
  
  // Use our custom hook for division goals filtering UI state
  const {
    sortColumn,
    sortDirection,
    handleSort
  } = useDivisionGoals();

  // State for filters
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  
  // Fetch data with React Query
  const { 
    data: departmentGoals, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useDepartmentGoalsQuery();

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

  // Calculate available divisions from data
  const divisions = departmentGoals 
    ? [{ id: 'all', name: 'All Divisions' }, ...departmentGoals.map(goal => ({
        id: goal.department,
        name: goal.departmentName
      }))]
    : [{ id: 'all', name: 'All Divisions' }];

  // Remove duplicates from divisions array
  const uniqueDivisions = divisions.filter(
    (division, index, self) => 
      index === self.findIndex((d) => d.id === division.id)
  );

  // Available years for filtering
  const availableYears = ['all', '2023', '2024'];

  // Filter goals based on selected filters
  const filteredGoals = departmentGoals?.filter(goal => {
    const matchesDivision = divisionFilter === 'all' || goal.department === divisionFilter;
    // Extract the year from createdAt
    const goalYear = new Date(goal.createdAt).getFullYear().toString();
    const matchesYear = yearFilter === 'all' || goalYear === yearFilter;
    return matchesDivision && matchesYear;
  }) || [];
  
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
        <DivisionGoalsFilters
          divisionFilter={divisionFilter}
          setDivisionFilter={setDivisionFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          divisions={uniqueDivisions}
          availableYears={availableYears}
        />

        {/* Goals Table */}
        <DivisionGoalsContent
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
          filteredGoals={filteredGoals}
          onFlagGoal={handleFlagGoal}
          onApproveGoalClick={handleApproveGoalClick}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
          isReadOnly={isReadOnly}
        />
      </div>

      {/* Dialogs */}
      <DivisionGoalsDialogs
        selectedGoal={selectedGoal}
        isFlagDialogOpen={isFlagDialogOpen}
        isApproveDialogOpen={isApproveDialogOpen}
        setIsFlagDialogOpen={setIsFlagDialogOpen}
        setIsApproveDialogOpen={setIsApproveDialogOpen}
        onFlagSubmit={handleFlagSubmit}
        onApproveConfirm={handleApproveConfirm}
      />
    </MainLayout>
  );
};

export default DivisionGoals;
