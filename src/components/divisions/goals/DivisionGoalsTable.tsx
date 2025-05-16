
import React, { memo } from 'react';
import { UnifiedGoal } from '@/types/unifiedGoals'; 
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';
import { UserRole } from '@/lib/permissions';
import SortableTableHeader from './SortableTableHeader';
import DivisionGoalTableRow from './DivisionGoalTableRow';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  EmptyTableRow
} from '@/components/ui/styled-table';

interface DivisionGoalsTableProps {
  goals: UnifiedGoal[];
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoal: (goal: UnifiedGoal) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  userRole: UserRole;
}

// Use memo to prevent unnecessary re-renders of the table
const DivisionGoalsTable = memo(({
  goals,
  onFlagGoal,
  onApproveGoal,
  sortColumn,
  sortDirection,
  onSort,
  userRole
}: DivisionGoalsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableTableHeader 
            column="departmentName"
            label="Department"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <SortableTableHeader 
            column="createdBy"
            label="Director"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <SortableTableHeader 
            column="title"
            label="Goal Title"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <SortableTableHeader 
            column="status"
            label="Status"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <SortableTableHeader 
            column="createdAt"
            label="Year"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {goals.length > 0 ? (
          goals.map(goal => (
            <DivisionGoalTableRow 
              key={goal.id}
              goal={goal}
              onFlagGoal={onFlagGoal}
              onApproveGoal={onApproveGoal}
              userRole={userRole}
            />
          ))
        ) : (
          <EmptyTableRow colSpan={6} message="No division goals found matching your filters." />
        )}
      </TableBody>
    </Table>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.sortColumn === nextProps.sortColumn &&
    prevProps.sortDirection === nextProps.sortDirection &&
    prevProps.userRole === nextProps.userRole &&
    prevProps.goals.length === nextProps.goals.length &&
    JSON.stringify(prevProps.goals) === JSON.stringify(nextProps.goals)
  );
});

// Add display name for debugging
DivisionGoalsTable.displayName = 'DivisionGoalsTable';

export default DivisionGoalsTable;
