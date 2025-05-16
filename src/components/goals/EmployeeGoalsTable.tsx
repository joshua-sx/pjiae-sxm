
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Flag, Check, ArrowUpAZ, ArrowDownAZ, LinkIcon } from "lucide-react";
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import { Progress } from "@/components/ui/progress";
import { UnifiedGoal } from '@/types/unifiedGoals';
import { useNavigate } from 'react-router-dom';
import { EmployeeGoalSortColumn, SortDirection } from '@/hooks/useEmployeeGoals';
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  EmptyTableRow,
  TableCaption
} from '@/components/ui/styled-table';

interface EmployeeGoalsTableProps {
  goals: UnifiedGoal[];
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoal: (goal: UnifiedGoal) => void;
  sortColumn: EmployeeGoalSortColumn;
  sortDirection: SortDirection;
  onSort: (column: EmployeeGoalSortColumn) => void;
}

const EmployeeGoalsTable = ({ 
  goals, 
  onFlagGoal, 
  onApproveGoal,
  sortColumn,
  sortDirection,
  onSort
}: EmployeeGoalsTableProps) => {
  const navigate = useNavigate();
  
  const handleViewGoal = (goalId: string) => {
    navigate(`/employee-goals/${goalId}`);
  };

  const renderSortIcon = (column: EmployeeGoalSortColumn) => {
    if (sortColumn !== column) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUpAZ className="ml-1 h-5 w-5 inline text-primary" />
      : <ArrowDownAZ className="ml-1 h-5 w-5 inline text-primary" />;
  };
  
  const getSortableHeaderProps = (column: EmployeeGoalSortColumn) => ({
    onClick: () => onSort(column),
    className: cn(
      "cursor-pointer hover:bg-muted/50 transition-colors relative group px-5"
    )
  });

  return (
    <Table>
      <TableCaption>Employee Goals Overview</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead {...getSortableHeaderProps('employeeName')} className="font-semibold">
            Employee
            {renderSortIcon('employeeName')}
            {!renderSortIcon('employeeName') && (
              <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpAZ className="h-4 w-4" />
              </span>
            )}
          </TableHead>
          <TableHead className="w-[300px]" {...getSortableHeaderProps('title')}>
            Goal
            {renderSortIcon('title')}
            {!renderSortIcon('title') && (
              <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpAZ className="h-4 w-4" />
              </span>
            )}
          </TableHead>
          <TableHead {...getSortableHeaderProps('status')}>
            Status
            {renderSortIcon('status')}
            {!renderSortIcon('status') && (
              <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpAZ className="h-4 w-4" />
              </span>
            )}
          </TableHead>
          <TableHead {...getSortableHeaderProps('departmentName')}>
            Division
            {renderSortIcon('departmentName')}
            {!renderSortIcon('departmentName') && (
              <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpAZ className="h-4 w-4" />
              </span>
            )}
          </TableHead>
          <TableHead {...getSortableHeaderProps('progress')}>
            Progress
            {renderSortIcon('progress')}
            {!renderSortIcon('progress') && (
              <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpAZ className="h-4 w-4" />
              </span>
            )}
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell className="font-medium">{goal.employeeName}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                <div className="flex items-start gap-1">
                  {goal.linkedDepartmentGoalId && (
                    <LinkIcon className="h-3.5 w-3.5 text-blue-500 mt-1 flex-shrink-0" />
                  )}
                  <span>{goal.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <GoalStatusBadge status={goal.status} />
              </TableCell>
              <TableCell>{goal.departmentName}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={goal.progress || 0} className="h-2" />
                  <span className="text-xs text-muted-foreground w-10">
                    {goal.progress || 0}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {goal.status === "submitted" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                        onClick={() => onFlagGoal(goal)}
                      >
                        <Flag className="h-4 w-4" />
                        <span className="sr-only">Flag</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => onApproveGoal(goal)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleViewGoal(goal.id)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <EmptyTableRow colSpan={6} message="No employee goals found matching your filters." />
        )}
      </TableBody>
    </Table>
  );
};

export default EmployeeGoalsTable;
