
import React from 'react';
import { Button } from "@/components/ui/button";
import DivisionGoalsTable from './goals/DivisionGoalsTable';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';
import { UserRole } from '@/lib/permissions';

interface DivisionGoalsContentProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  filteredGoals: UnifiedGoal[];
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoalClick: (goal: UnifiedGoal) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  handleSort: (column: SortColumn) => void;
  isReadOnly: boolean;
  userRole: UserRole;
}

const DivisionGoalsContent = ({
  isLoading,
  isError,
  error,
  refetch,
  filteredGoals,
  onFlagGoal,
  onApproveGoalClick,
  sortColumn,
  sortDirection,
  handleSort,
  isReadOnly,
  userRole
}: DivisionGoalsContentProps) => {
  if (isError) {
    return (
      <div className="rounded-md p-4 bg-destructive/10">
        <div className="flex flex-col space-y-3">
          <h3 className="font-semibold text-destructive">Error Loading Division Goals</h3>
          <p className="text-sm">{error?.message || 'An unknown error occurred'}</p>
          <div>
            <Button onClick={refetch} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DivisionGoalsTable
      goals={filteredGoals}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onFlagGoal={onFlagGoal}
      onApproveGoalClick={onApproveGoalClick}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      handleSort={handleSort}
      userRole={userRole}
    />
  );
};

export default DivisionGoalsContent;
