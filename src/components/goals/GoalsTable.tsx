
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Check, Flag } from "lucide-react";
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import FlagCommentDialog from '@/components/goals/FlagCommentDialog';
import ApproveGoalDialog from '@/components/goals/ApproveGoalDialog';
import { useToast } from "@/components/ui/use-toast";
import { UnifiedGoal } from '@/types/unifiedGoals';

interface GoalsTableProps {
  goals: UnifiedGoal[];
  canFlagGoals: boolean;
  canApproveGoals: boolean;
}

const GoalsTable = ({ goals, canFlagGoals, canApproveGoals }: GoalsTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGoal, setSelectedGoal] = useState<UnifiedGoal | null>(null);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const handleGoalClick = (goalId: string, type: 'employee' | 'department') => {
    if (type === 'department') {
      navigate(`/department-goals/${goalId}`);
    } else {
      navigate(`/employee-goals/${goalId}`);
    }
  };

  const openFlagDialog = (e: React.MouseEvent, goal: UnifiedGoal) => {
    e.stopPropagation();
    setSelectedGoal(goal);
    setIsFlagDialogOpen(true);
  };

  const openApproveDialog = (e: React.MouseEvent, goal: UnifiedGoal) => {
    e.stopPropagation();
    setSelectedGoal(goal);
    setIsApproveDialogOpen(true);
  };

  const handleFlagSubmit = (comment: string) => {
    // In a real app, this would send the flag comment to the API
    toast({
      title: "Goal Flagged",
      description: `The goal "${selectedGoal?.title}" has been flagged for review.`,
    });
  };

  const handleApproveConfirm = () => {
    // In a real app, this would update the goal status in the database
    toast({
      title: "Goal Approved",
      description: `The goal "${selectedGoal?.title}" has been approved.`,
    });
  };

  return (
    <>
      <Table>
        <TableCaption>A list of all goals in the organization.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell>{goal.departmentName}</TableCell>
              <TableCell>{goal.createdBy}</TableCell>
              <TableCell>{goal.creatorRole}</TableCell>
              <TableCell className="font-medium">
                {goal.type === 'department' ? 'All Department Members' : goal.employeeName}
              </TableCell>
              <TableCell>{goal.title}</TableCell>
              <TableCell>
                <GoalStatusBadge status={goal.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleGoalClick(goal.id, goal.type)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  
                  {/* Flag button - only visible for HR Officers and only for submitted goals */}
                  {canFlagGoals && goal.status === "submitted" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                      onClick={(e) => openFlagDialog(e, goal)}
                    >
                      <Flag className="h-4 w-4" />
                      <span className="sr-only">Flag</span>
                    </Button>
                  )}
                  
                  {/* Approve button - only visible for Directors and HR Officers and only for submitted goals */}
                  {canApproveGoals && goal.status === "submitted" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-50"
                      onClick={(e) => openApproveDialog(e, goal)}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Approve</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Flag Comment Dialog */}
      {selectedGoal && (
        <FlagCommentDialog
          isOpen={isFlagDialogOpen}
          onClose={() => setIsFlagDialogOpen(false)}
          onSubmit={handleFlagSubmit}
          goalTitle={selectedGoal.title}
        />
      )}

      {/* Approve Goal Dialog */}
      {selectedGoal && (
        <ApproveGoalDialog
          isOpen={isApproveDialogOpen}
          onClose={() => setIsApproveDialogOpen(false)}
          onConfirm={handleApproveConfirm}
          goalTitle={selectedGoal.title}
        />
      )}
    </>
  );
};

export default GoalsTable;
