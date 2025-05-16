
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/styled-table";
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { UserRole } from '@/lib/permissions';
import DivisionGoalTableActions from './DivisionGoalTableActions';

interface DivisionGoalTableRowProps {
  goal: UnifiedGoal;
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoal: (goal: UnifiedGoal) => void;
  userRole: UserRole;
}

const DivisionGoalTableRow = ({
  goal,
  onFlagGoal,
  onApproveGoal,
  userRole
}: DivisionGoalTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{goal.departmentName}</TableCell>
      <TableCell>{goal.createdBy}</TableCell>
      <TableCell className="max-w-[300px] truncate">{goal.title}</TableCell>
      <TableCell>
        <GoalStatusBadge status={goal.status} />
      </TableCell>
      <TableCell>
        {new Date(goal.createdAt).getFullYear()}
      </TableCell>
      <TableCell className="text-right">
        <DivisionGoalTableActions
          goal={goal}
          onFlagGoal={onFlagGoal}
          onApproveGoal={onApproveGoal}
          userRole={userRole}
        />
      </TableCell>
    </TableRow>
  );
};

export default DivisionGoalTableRow;
