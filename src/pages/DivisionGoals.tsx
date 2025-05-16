
import React, { useCallback, useMemo } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import DivisionGoalsHeader from '@/components/divisions/DivisionGoalsHeader';
import DivisionGoalsFilters from '@/components/divisions/DivisionGoalsFilters';
import DivisionGoalsContent from '@/components/divisions/DivisionGoalsContent';
import DivisionGoalsAccessDenied from '@/components/divisions/DivisionGoalsAccessDenied';
import DivisionGoalsDialogs from '@/components/divisions/DivisionGoalsDialogs';
import { useDivisionGoalsState } from '@/hooks/useDivisionGoalsState';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { UserRole } from '@/lib/permissions';

export default function DivisionGoals() {
  // Get user permissions
  const { hasPermission, role } = useAuth();
  
  // Check for read-only access
  const canReadOnly = hasPermission('canViewDivisionGoals');
  const canEdit = hasPermission('canManageDivisionGoals');
  const isReadOnly = canReadOnly && !canEdit;
  
  // If the user doesn't have permission to view division goals, show access denied
  if (!canReadOnly && !canEdit) {
    return (
      <MainLayout>
        <DivisionGoalsAccessDenied />
      </MainLayout>
    );
  }

  // Memoize the user role to prevent unnecessary re-renders
  const memoizedUserRole = useMemo(() => role, [role]);
  
  // Use the division goals state hook - this now provides all the data we need
  const {
    // Filter state
    divisionFilter,
    setDivisionFilter,
    yearFilter,
    setYearFilter,
    
    // Data and loading state
    filteredGoals,
    isLoading,
    isError,
    error,
    refetch,
    divisions,
    availableYears,
    
    // Dialog state
    selectedGoal,
    setSelectedGoal,
    isFlagDialogOpen,
    setIsFlagDialogOpen,
    isApproveDialogOpen,
    setIsApproveDialogOpen,
    
    // Action handlers
    handleFlagGoal,
    handleApproveGoalClick,
    
    // Sorting
    sortColumn,
    sortDirection,
    handleSort,
  } = useDivisionGoalsState();
  
  // Determine if the division filter should be disabled
  // Directors can only see their own division's goals
  const disableDivisionFilter = role === UserRole.DIRECTOR;
  
  // Handle flag submission
  const handleFlagSubmit = useCallback((comment: string) => {
    // This is mocked - in a real app, it would make an API call
    toast({
      title: "Goal flagged",
      description: `The goal has been flagged with your comment: ${comment}`,
    });
    
    setIsFlagDialogOpen(false);
    refetch(); // Refresh the data
  }, [toast, setIsFlagDialogOpen, refetch]);
  
  // Handle approve goal confirmation
  const handleApproveConfirm = useCallback(() => {
    // This is mocked - in a real app, it would make an API call
    toast({
      title: "Goal approved",
      description: "The goal has been approved successfully.",
    });
    
    setIsApproveDialogOpen(false);
    refetch(); // Refresh the data
  }, [toast, setIsApproveDialogOpen, refetch]);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <DivisionGoalsHeader isReadOnly={isReadOnly} />
        
        <DivisionGoalsFilters
          divisionFilter={divisionFilter}
          setDivisionFilter={setDivisionFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          divisions={divisions}
          availableYears={availableYears}
          disableDivisionFilter={disableDivisionFilter}
        />
        
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
          userRole={memoizedUserRole}
        />
        
        <DivisionGoalsDialogs
          selectedGoal={selectedGoal}
          isFlagDialogOpen={isFlagDialogOpen}
          isApproveDialogOpen={isApproveDialogOpen}
          setIsFlagDialogOpen={setIsFlagDialogOpen}
          setIsApproveDialogOpen={setIsApproveDialogOpen}
          onFlagSubmit={handleFlagSubmit}
          onApproveConfirm={handleApproveConfirm}
        />
      </div>
    </MainLayout>
  );
}
