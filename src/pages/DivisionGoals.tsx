
import React, { useState, useCallback, useMemo } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import DivisionGoalsHeader from '@/components/divisions/DivisionGoalsHeader';
import DivisionGoalsFilters from '@/components/divisions/DivisionGoalsFilters';
import DivisionGoalsContent from '@/components/divisions/DivisionGoalsContent';
import DivisionGoalsAccessDenied from '@/components/divisions/DivisionGoalsAccessDenied';
import DivisionGoalsDialogs from '@/components/divisions/DivisionGoalsDialogs';
import { useDivisionGoals } from '@/hooks/useDivisionGoals';
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

  // Memoize the state to prevent unnecessary re-renders
  const memoizedUserRole = useMemo(() => role, [role]);
  
  // Use the division goals state hook
  const {
    divisionFilter,
    setDivisionFilter,
    yearFilter,
    setYearFilter,
    filteredGoals,
    selectedGoal,
    setSelectedGoal,
    isFlagDialogOpen,
    setIsFlagDialogOpen,
    isApproveDialogOpen,
    setIsApproveDialogOpen,
    sortColumn,
    sortDirection,
    handleSort,
  } = useDivisionGoalsState();
  
  // Fetch division goals data
  const { 
    isLoading, 
    isError, 
    error, 
    refetch,
    divisions,
    availableYears,
  } = useDivisionGoals(divisionFilter, yearFilter, role);
  
  // Determine if the division filter should be disabled
  // Directors can only see their own division's goals
  const disableDivisionFilter = role === UserRole.DIRECTOR;
  
  // Handle flagging a goal
  const handleFlagGoal = useCallback((goal) => {
    setSelectedGoal(goal);
    setIsFlagDialogOpen(true);
  }, [setSelectedGoal, setIsFlagDialogOpen]);
  
  // Handle approving a goal
  const handleApproveGoalClick = useCallback((goal) => {
    setSelectedGoal(goal);
    setIsApproveDialogOpen(true);
  }, [setSelectedGoal, setIsApproveDialogOpen]);
  
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
          divisions={divisions || []}
          availableYears={availableYears || []}
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
