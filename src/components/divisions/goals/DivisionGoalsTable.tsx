
import React, { memo } from 'react'; // Add memo to prevent unnecessary renders
import { Table, TableBody } from '@/components/ui/table';
import { UnifiedGoal } from '@/types/unifiedGoals'; 
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';
import SortableTableHeader from './SortableTableHeader';
import DivisionGoalTableRow from './DivisionGoalTableRow';
import { UserRole } from '@/lib/permissions';

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
    <div className="w-full overflow-auto">
      <Table>
        <SortableTableHeader 
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <TableBody>
          {goals.map(goal => (
            <DivisionGoalTableRow 
              key={goal.id}
              goal={goal}
              onFlagGoal={onFlagGoal}
              onApproveGoal={onApproveGoal}
              userRole={userRole}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

// Add display name for debugging
DivisionGoalsTable.displayName = 'DivisionGoalsTable';

export default DivisionGoalsTable;
