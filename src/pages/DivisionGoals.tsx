
import React, { useMemo } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import DivisionGoalsHeader from '@/components/divisions/DivisionGoalsHeader';
import DivisionGoalsFilters from '@/components/divisions/DivisionGoalsFilters';
import DivisionGoalsContent from '@/components/divisions/DivisionGoalsContent';
import DivisionGoalsAccessDenied from '@/components/divisions/DivisionGoalsAccessDenied';
import DivisionGoalsDialogs from '@/components/divisions/DivisionGoalsDialogs';
import { useDivisionGoalsState } from '@/hooks/useDivisionGoalsState';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/permissions';

export default function DivisionGoals() {
  // Get user permissions
  const { hasPermission, role } = useAuth();
  
  // Check for read-only access
  const canReadOnly = hasPermission('canViewDivisionGoals');
  const canEdit = hasPermission('canManageDivisionGoals');
  const isReadOnly = useMemo(() => canReadOnly && !canEdit, [canReadOnly, canEdit]);
  
  // If the user doesn't have permission to view division goals, show access denied
  if (!canReadOnly && !canEdit) {
    return (
      <MainLayout>
        <DivisionGoalsAccessDenied />
      </MainLayout>
    );
  }
  
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
    handleFlagSubmit,
    handleApproveConfirm,
    
    // Sorting
    sortColumn,
    sortDirection,
    handleSort,
  } = useDivisionGoalsState();
  
  // Determine if the division filter should be disabled
  // Directors can only see their own division's goals
  const disableDivisionFilter = useMemo(() => role === UserRole.DIRECTOR, [role]);
  
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
          userRole={role}
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
