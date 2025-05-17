
import React from "react";
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, ChevronRight, AlertTriangle } from "lucide-react";
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import { DepartmentGoal } from '@/types/goals';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

const EmptyState = ({ icon, title, description, iconColor }: EmptyStateProps) => (
  <div className="text-center py-8">
    <div className="flex justify-center mb-2">
      <span className={iconColor}>{icon}</span>
    </div>
    <h3 className="font-medium text-lg">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface GoalCardProps {
  goal: DepartmentGoal;
  onSetDeadline: (goalId: string) => void;
  onViewGoal: (goalId: string) => void;
  showDeadlineButton?: boolean;
  showFlaggedInfo?: boolean;
}

const GoalCard = ({ goal, onSetDeadline, onViewGoal, showDeadlineButton, showFlaggedInfo }: GoalCardProps) => (
  <Card key={goal.id}>
    <CardContent className="p-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{goal.title}</h3>
            <GoalStatusBadge status={goal.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">{goal.departmentName}</p>
          
          {showFlaggedInfo ? (
            <div className="flex items-center gap-1 text-amber-600 text-xs mt-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Flagged on {format(new Date(goal.updatedAt), 'MMM d, yyyy')}</span>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              {goal.status === "approved" ? "Approved" : "Submitted"} on {format(new Date(goal.updatedAt), 'MMM d, yyyy')}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showDeadlineButton && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onSetDeadline(goal.id)}
            >
              <Calendar className="mr-1 h-4 w-4" />
              Set Deadline
            </Button>
          )}
          <Button 
            size="sm"
            onClick={() => onViewGoal(goal.id)}
            variant={!showDeadlineButton ? "outline" : "default"}
          >
            {goal.status === "submitted" ? "Review" : "View Details"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface HRGoalsListProps {
  goals: DepartmentGoal[];
  type: 'pending' | 'flagged' | 'approved';
  onSetDeadline: (goalId: string) => void;
  onViewGoal: (goalId: string) => void;
}

export const HRGoalsList = ({ goals, type, onSetDeadline, onViewGoal }: HRGoalsListProps) => {
  if (goals.length === 0) {
    if (type === 'pending') {
      return (
        <EmptyState
          icon={<CheckCircle className="h-8 w-8" />}
          title="No pending goals"
          description="All department goals have been reviewed."
          iconColor="text-green-500"
        />
      );
    } else if (type === 'flagged') {
      return (
        <EmptyState
          icon={<CheckCircle className="h-8 w-8" />}
          title="No flagged goals"
          description="There are currently no flagged goals requiring attention."
          iconColor="text-green-500"
        />
      );
    } else {
      return (
        <EmptyState
          icon={<AlertTriangle className="h-8 w-8" />}
          title="No approved goals"
          description="No goals have been approved yet."
          iconColor="text-amber-500"
        />
      );
    }
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onSetDeadline={onSetDeadline}
          onViewGoal={onViewGoal}
          showDeadlineButton={type === 'pending'}
          showFlaggedInfo={type === 'flagged'}
        />
      ))}
    </div>
  );
};
