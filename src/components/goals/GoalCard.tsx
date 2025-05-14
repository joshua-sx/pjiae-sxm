
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Flag, MessageSquare, Users } from "lucide-react";
import GoalStatusBadge from "./GoalStatusBadge";
import { DepartmentGoal, EmployeeGoal, Goal } from "@/types/goals";
import { formatDistanceToNow } from "date-fns";

interface GoalCardProps {
  goal: DepartmentGoal | EmployeeGoal;
  onClick: (goalId: string) => void;
}

const GoalCard = ({ goal, onClick }: GoalCardProps) => {
  const isDepartmentGoal = 'departmentName' in goal;
  
  const commentCount = goal.comments.length;
  const flagCount = goal.comments.filter(c => c.isFlag).length;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{goal.title}</CardTitle>
          <GoalStatusBadge status={goal.status} />
        </div>
        <CardDescription className="flex items-center gap-1 text-xs">
          {isDepartmentGoal ? (
            <>
              <Users size={14} />
              {(goal as DepartmentGoal).departmentName}
            </>
          ) : (
            <>
              <Users size={14} />
              {(goal as EmployeeGoal).employeeName}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2">{goal.description}</p>
        
        {goal.deadline && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Calendar size={14} />
            Deadline: {formatDistanceToNow(new Date(goal.deadline), { addSuffix: true })}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex gap-3">
          {flagCount > 0 && (
            <span className="flex items-center text-xs gap-1 text-amber-500">
              <Flag size={14} />
              {flagCount}
            </span>
          )}
          {commentCount > 0 && (
            <span className="flex items-center text-xs gap-1 text-muted-foreground">
              <MessageSquare size={14} />
              {commentCount}
            </span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onClick(goal.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
