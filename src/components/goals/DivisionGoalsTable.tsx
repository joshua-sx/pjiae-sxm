
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
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { useNavigate } from 'react-router-dom';
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';

interface DivisionGoalsTableProps {
  goals: UnifiedGoal[];
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoal: (goal: UnifiedGoal) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}

const DivisionGoalsTable = ({ 
  goals, 
  onFlagGoal, 
  onApproveGoal,
  sortColumn,
  sortDirection,
  onSort
}: DivisionGoalsTableProps) => {
  const navigate = useNavigate();
  
  const handleViewGoal = (goalId: string) => {
    navigate(`/department-goals/${goalId}`);
  };

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUpAZ className="ml-1 h-4 w-4 inline" />
      : <ArrowDownAZ className="ml-1 h-4 w-4 inline" />;
  };
  
  const getSortableHeaderProps = (column: SortColumn) => ({
    onClick: () => onSort(column),
    className: "cursor-pointer hover:bg-muted/20 transition-colors"
  });

  return (
    <Table>
      <TableCaption>Division Goals Overview</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead {...getSortableHeaderProps('departmentName')}>
            Division {renderSortIcon('departmentName')}
          </TableHead>
          <TableHead {...getSortableHeaderProps('createdBy')}>
            Director {renderSortIcon('createdBy')}
          </TableHead>
          <TableHead className="w-[300px]" {...getSortableHeaderProps('title')}>
            Goal {renderSortIcon('title')}
          </TableHead>
          <TableHead {...getSortableHeaderProps('status')}>
            Status {renderSortIcon('status')}
          </TableHead>
          <TableHead {...getSortableHeaderProps('createdAt')}>
            Year {renderSortIcon('createdAt')}
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {goals.map((goal) => (
          <TableRow key={goal.id}>
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
                
                {/* View button moved to the far right */}
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
  );
};

export default DivisionGoalsTable;
