
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UnifiedGoal } from '@/types/unifiedGoals';
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';
import { UserRole } from '@/lib/permissions';
import SortableTableHeader from './SortableTableHeader';
import DivisionGoalTableRow from './DivisionGoalTableRow';

interface DivisionGoalsTableProps {
  goals: UnifiedGoal[];
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoal: (goal: UnifiedGoal) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  userRole: UserRole;
}

const DivisionGoalsTable = ({ 
  goals, 
  onFlagGoal, 
  onApproveGoal,
  sortColumn,
  sortDirection,
  onSort,
  userRole
}: DivisionGoalsTableProps) => {
  return (
    <TooltipProvider>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableCaption>Division Goals Overview</TableCaption>
          <TableHeader className="bg-muted/20 sticky top-0">
            <TableRow>
              <SortableTableHeader
                column="departmentName"
                label="Division"
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
                label="Goal"
                currentSortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
                className="w-[300px]"
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
              <SortableTableHeader
                column="actions"
                label="Actions"
                currentSortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={() => {}}  // Actions column is not sortable
                className="text-right"
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.map((goal) => (
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
    </TooltipProvider>
  );
};

export default DivisionGoalsTable;
