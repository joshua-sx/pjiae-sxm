
import React from 'react';
import { Column } from '@/components/common/AppTable';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { Button } from '@/components/ui/button';
import { Eye, Flag, CheckCircle } from 'lucide-react';
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { UserRole } from '@/lib/permissions';

// Basic columns for all users
export const baseGoalColumns: Column<UnifiedGoal>[] = [
  { key: 'title', label: 'Goal Title', sortable: true, width: 'w-[30%]' },
  { 
    key: 'status', 
    label: 'Status', 
    sortable: true, 
    width: 'w-[15%]',
    render: (goal) => <GoalStatusBadge status={goal.status} /> 
  },
  { 
    key: 'createdAt', 
    label: 'Date', 
    sortable: true,
    render: (goal) => format(new Date(goal.createdAt), 'MMM d, yyyy')
  },
];

// Division goal columns
export const divisionGoalColumns: Column<UnifiedGoal>[] = [
  { key: 'departmentName', label: 'Department', sortable: true, width: 'w-[20%]' },
  { key: 'createdBy', label: 'Director', sortable: true, width: 'w-[15%]' },
  ...baseGoalColumns,
];

// Employee goal columns
export const employeeGoalColumns: Column<UnifiedGoal>[] = [
  { key: 'employeeName', label: 'Employee', sortable: true, width: 'w-[20%]' },
  { key: 'departmentName', label: 'Department', sortable: true, width: 'w-[15%]' },
  ...baseGoalColumns,
];

// Action column generators (to be combined with other columns)
export const getGoalViewAction = <T extends UnifiedGoal>(urlPrefix: string): Column<T> => ({
  key: 'actions' as keyof T,
  label: 'View',
  width: 'w-[80px]',
  render: (goal) => (
    <Button variant="ghost" size="sm" asChild className="px-2">
      <Link to={`${urlPrefix}/${goal.id}`}>
        <Eye className="h-4 w-4 mr-1" />
        View
      </Link>
    </Button>
  )
});

export const getGoalActions = <T extends UnifiedGoal>(
  onFlagGoal: (goal: T) => void,
  onApproveGoal: (goal: T) => void,
  userRole: UserRole
): Column<T> => ({
  key: 'actions' as keyof T,
  label: 'Actions',
  width: 'w-[180px]',
  render: (goal) => (
    <div className="flex space-x-2 justify-end">
      {userRole === UserRole.HR_OFFICER && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onFlagGoal(goal)}
          className="px-2"
        >
          <Flag className="h-4 w-4 mr-1" />
          Flag
        </Button>
      )}
      {(userRole === UserRole.HR_OFFICER || userRole === UserRole.DIRECTOR) && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onApproveGoal(goal)}
          className="px-2"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Approve
        </Button>
      )}
      <Button variant="ghost" size="sm" asChild className="px-2">
        <Link to={`/division-goals/${goal.id}`}>
          <Eye className="h-4 w-4 mr-1" />
          View
        </Link>
      </Button>
    </div>
  )
});
