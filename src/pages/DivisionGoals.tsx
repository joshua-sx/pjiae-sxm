
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import DivisionGoalsHeader from '@/components/divisions/DivisionGoalsHeader';
import DivisionGoalsFilters from '@/components/divisions/DivisionGoalsFilters';
import DivisionGoalsContent from '@/components/divisions/DivisionGoalsContent';
import DivisionGoalsDialogs from '@/components/divisions/DivisionGoalsDialogs';
import DivisionGoalsAccessDenied from '@/components/divisions/DivisionGoalsAccessDenied';
import { useDivisionGoalsState } from '@/hooks/useDivisionGoalsState';

const DivisionGoals = () => {
  const {
    role,
    isHROrIT,
    isDirector,
    isReadOnly,
    divisionFilter,
    setDivisionFilter,
    yearFilter,
    setYearFilter,
    isLoading,
    isError,
    error,
    refetch,
    filteredGoals,
    selectedGoal,
    isFlagDialogOpen,
    isApproveDialogOpen,
    setIsFlagDialogOpen,
    setIsApproveDialogOpen,
    handleFlagGoal,
    handleApproveGoalClick,
    handleFlagSubmit,
    handleApproveConfirm,
    sortColumn,
    sortDirection,
    handleSort,
    uniqueDivisions,
    availableYears,
    directorDivision
  } = useDivisionGoalsState();

  // Auto-select the director's division on initial load
  // Only update if the division filter is 'all' and we have a directorDivision
  useEffect(() => {
    if (isDirector && divisionFilter === 'all' && directorDivision !== 'all') {
      setDivisionFilter(directorDivision);
    }
  }, [isDirector, directorDivision, divisionFilter, setDivisionFilter]);

  // Show no access alert for unauthorized users
  if (!isHROrIT && !isDirector) {
    return (
      <MainLayout>
        <DivisionGoalsAccessDenied />
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <DivisionGoalsHeader isReadOnly={isReadOnly} />
        
        {/* Filters - disable division selector for directors */}
        <DivisionGoalsFilters
          divisionFilter={divisionFilter}
          setDivisionFilter={setDivisionFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          divisions={uniqueDivisions}
          availableYears={availableYears}
          disableDivisionFilter={isDirector}
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
          userRole={role}
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
