
import React from 'react';
import { AppTable } from '@/components/common/AppTable';
import { divisionGoalColumns, getGoalActions } from '@/components/columns/goalColumns';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';
import { UserRole } from '@/lib/permissions';

interface DivisionGoalsTableProps {
  goals: UnifiedGoal[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoalClick: (goal: UnifiedGoal) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  handleSort: (column: SortColumn) => void;
  userRole: UserRole;
}

const DivisionGoalsTable = ({
  goals,
  isLoading,
  isError,
  error,
  onFlagGoal,
  onApproveGoalClick,
  sortColumn,
  sortDirection,
  handleSort,
  userRole
}: DivisionGoalsTableProps) => {
  // Combine standard columns with role-specific action column
  const columns = [
    ...divisionGoalColumns,
    getGoalActions(onFlagGoal, onApproveGoalClick, userRole)
  ];

  return (
    <AppTable
      columns={columns}
      data={goals}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      sortColumn={sortColumn as keyof UnifiedGoal}
      sortDirection={sortDirection}
      onSort={handleSort as (column: keyof UnifiedGoal) => void}
      emptyMessage="No division goals found matching your criteria."
    />
  );
};

export default DivisionGoalsTable;
