
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Flag, Check } from "lucide-react";
import { TooltipProvider, TooltipContent, TooltipTrigger, Tooltip } from "@/components/ui/tooltip";
import { UnifiedGoal } from '@/types/unifiedGoals';
import { UserRole } from '@/lib/permissions';
import { useNavigate } from 'react-router-dom';

interface DivisionGoalTableActionsProps {
  goal: UnifiedGoal;
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoal: (goal: UnifiedGoal) => void;
  userRole: UserRole;
}

const DivisionGoalTableActions = ({
  goal,
  onFlagGoal,
  onApproveGoal,
  userRole
}: DivisionGoalTableActionsProps) => {
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

  return (
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
  );
};

export default DivisionGoalTableActions;
