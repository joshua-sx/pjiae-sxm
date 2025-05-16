import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Flag, Check, ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import Tooltip, { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { useNavigate } from 'react-router-dom';
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';
import { cn } from "@/lib/utils";
import { UserRole } from '@/lib/permissions';

interface DivisionGoalsTableProps {
  goals: UnifiedGoal[];
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoal: (goal: UnifiedGoal) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  userRole: UserRole; // Add user role property
}

const DivisionGoalsTable = ({ 
  goals, 
  onFlagGoal, 
  onApproveGoal,
  sortColumn,
  sortDirection,
  onSort,
  userRole // Add user role parameter
}: DivisionGoalsTableProps) => {
  const navigate = useNavigate();
  
  const handleViewGoal = (goalId: string) => {
    navigate(`/department-goals/${goalId}`);
  };

  // Function to check if user can flag/approve this goal
  const canModifyGoal = (goal: UnifiedGoal): boolean => {
    // Only HR Officers can flag/approve goals
    if (userRole === UserRole.HR_OFFICER) {
      return true;
    }
    // Directors cannot flag/approve their own goals
    if (userRole === UserRole.DIRECTOR) {
      return false;
    }
    return false;
  };

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUpAZ className="ml-1 h-5 w-5 inline text-primary" />
      : <ArrowDownAZ className="ml-1 h-5 w-5 inline text-primary" />;
  };
  
  const getSortableHeaderProps = (column: SortColumn) => ({
    onClick: () => onSort(column),
    className: cn(
      "cursor-pointer hover:bg-muted/50 transition-colors relative group px-5",
    )
  });

  return (
    <TooltipProvider>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableCaption>Division Goals Overview</TableCaption>
          <TableHeader className="bg-muted/20 sticky top-0">
            <TableRow>
              <TableHead {...getSortableHeaderProps('departmentName')} className="font-semibold">
                Division 
                {renderSortIcon('departmentName')}
                {!renderSortIcon('departmentName') && (
                  <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpAZ className="h-4 w-4" />
                  </span>
                )}
              </TableHead>
              <TableHead {...getSortableHeaderProps('createdBy')} className="font-semibold">
                Director 
                {renderSortIcon('createdBy')}
                {!renderSortIcon('createdBy') && (
                  <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpAZ className="h-4 w-4" />
                  </span>
                )}
              </TableHead>
              <TableHead className="w-[300px] font-semibold" {...getSortableHeaderProps('title')}>
                Goal 
                {renderSortIcon('title')}
                {!renderSortIcon('title') && (
                  <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpAZ className="h-4 w-4" />
                  </span>
                )}
              </TableHead>
              <TableHead {...getSortableHeaderProps('status')} className="font-semibold">
                Status 
                {renderSortIcon('status')}
                {!renderSortIcon('status') && (
                  <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpAZ className="h-4 w-4" />
                  </span>
                )}
              </TableHead>
              <TableHead {...getSortableHeaderProps('createdAt')} className="font-semibold">
                Year 
                {renderSortIcon('createdAt')}
                {!renderSortIcon('createdAt') && (
                  <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpAZ className="h-4 w-4" />
                  </span>
                )}
              </TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal.id} className="border-b hover:bg-muted/20">
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
                  <div className="flex justify-end gap-2">
                    {goal.status === "submitted" && (
                      <>
                        {canModifyGoal(goal) ? (
                          // If HR Officer, show active buttons
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
                        ) : (
                          // If Director or other role, show disabled buttons with tooltip
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-muted-foreground cursor-not-allowed opacity-50"
                                  disabled
                                >
                                  <Flag className="h-4 w-4" />
                                  <span className="sr-only">Flag</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p>Only HR Officers can flag goals</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-muted-foreground cursor-not-allowed opacity-50"
                                  disabled
                                >
                                  <Check className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p>Only HR Officers can approve goals</p>
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default DivisionGoalsTable;
