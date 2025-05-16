
import React from 'react';
import FlagCommentDialog from '@/components/goals/FlagCommentDialog';
import ApproveGoalDialog from '@/components/goals/ApproveGoalDialog';
import { UnifiedGoal } from '@/types/unifiedGoals';

interface DivisionGoalsDialogsProps {
  selectedGoal: UnifiedGoal | null;
  isFlagDialogOpen: boolean;
  isApproveDialogOpen: boolean;
  setIsFlagDialogOpen: (isOpen: boolean) => void;
  setIsApproveDialogOpen: (isOpen: boolean) => void;
  onFlagSubmit: (comment: string) => void;
  onApproveConfirm: () => void;
}

const DivisionGoalsDialogs = ({
  selectedGoal,
  isFlagDialogOpen,
  isApproveDialogOpen,
  setIsFlagDialogOpen,
  setIsApproveDialogOpen,
  onFlagSubmit,
  onApproveConfirm
}: DivisionGoalsDialogsProps) => {
  if (!selectedGoal) return null;
  
  return (
    <>
      <FlagCommentDialog
        isOpen={isFlagDialogOpen}
        onClose={() => setIsFlagDialogOpen(false)}
        onSubmit={onFlagSubmit}
        goalTitle={selectedGoal.title}
      />
      
      <ApproveGoalDialog
        isOpen={isApproveDialogOpen}
        onClose={() => setIsApproveDialogOpen(false)}
        onConfirm={onApproveConfirm}
        goalTitle={selectedGoal.title}
      />
    </>
  );
};

export default DivisionGoalsDialogs;
