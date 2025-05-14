
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress?: number;
}

interface GoalReviewCardProps {
  goal: Goal;
  onFlagGoal: (goalId: string) => void;
}

const GoalReviewCard = ({ goal, onFlagGoal }: GoalReviewCardProps) => {
  return (
    <Card key={goal.id} className="relative">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{goal.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
            {goal.progress !== undefined && (
              <div className="mt-2 flex items-center">
                <span className="text-xs font-medium mr-2">Progress:</span>
                <span className="text-xs">{goal.progress}%</span>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500"
            onClick={() => onFlagGoal(goal.id)}
          >
            <Flag size={16} className="mr-1" />
            Flag
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalReviewCard;
