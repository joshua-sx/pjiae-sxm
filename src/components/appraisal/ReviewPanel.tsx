
import { useState } from "react";
import { AppraisalForm } from "@/types/appraisal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import GoalReviewCard from "./GoalReviewCard";
import CommentsList from "./CommentsList";
import PerformanceRatings from "./PerformanceRatings";
import FlagDialog from "./FlagDialog";
import RejectDialog from "./RejectDialog";

interface ReviewPanelProps {
  appraisal: AppraisalForm | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, comment: string) => void;
  onFlag: (id: string, goalId: string | null, reason: string) => void;
  open: boolean;
}

const ReviewPanel = ({ 
  appraisal, 
  onClose, 
  onApprove, 
  onReject, 
  onFlag,
  open 
}: ReviewPanelProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  if (!appraisal) return null;

  const handleApprove = () => {
    onApprove(appraisal.id);
    toast({
      title: "Appraisal Approved",
      description: `You've approved ${appraisal.employeeName}'s ${appraisal.phase} form.`
    });
  };

  const handleRejectSubmit = () => {
    if (!comment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive"
      });
      return;
    }
    
    onReject(appraisal.id, comment);
    setComment("");
    setIsRejectDialogOpen(false);
    toast({
      title: "Revision Requested",
      description: `Revision request sent to ${appraisal.employeeName}.`
    });
  };

  const handleFlagSubmit = () => {
    if (!flagReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for flagging.",
        variant: "destructive"
      });
      return;
    }
    
    onFlag(appraisal.id, selectedGoalId, flagReason);
    setFlagReason("");
    setIsFlagDialogOpen(false);
    setSelectedGoalId(null);
    toast({
      title: "Item Flagged",
      description: `You've flagged an item for ${appraisal.employeeName}'s appraisal.`
    });
  };

  const openFlagDialog = (goalId: string | null = null) => {
    setSelectedGoalId(goalId);
    setIsFlagDialogOpen(true);
  };

  const formatPhase = (phase: string) => {
    return phase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">{appraisal.employeeName}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{appraisal.position}</span>
            <span>•</span>
            <span>{appraisal.department}</span>
          </div>
        </div>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {formatPhase(appraisal.phase)}
        </Badge>
      </div>

      {appraisal.goals && appraisal.goals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Goals</h3>
          <div className="space-y-3">
            {appraisal.goals.map((goal) => (
              <GoalReviewCard 
                key={goal.id} 
                goal={goal} 
                onFlagGoal={(goalId) => openFlagDialog(goalId)} 
              />
            ))}
          </div>
        </div>
      )}

      {appraisal.ratings && (
        <PerformanceRatings ratings={appraisal.ratings} />
      )}

      <CommentsList comments={appraisal.comments} />

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button 
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50"
          onClick={() => openFlagDialog()}
        >
          <Flag size={16} className="mr-1" />
          Flag Appraisal
        </Button>
        <Button 
          variant="outline"
          className="text-amber-600 border-amber-200 hover:bg-amber-50"
          onClick={() => setIsRejectDialogOpen(true)}
        >
          <AlertCircle size={16} className="mr-1" />
          Request Revision
        </Button>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={handleApprove}
        >
          <Check size={16} className="mr-1" />
          Approve
        </Button>
      </div>

      <RejectDialog 
        open={isRejectDialogOpen} 
        onOpenChange={setIsRejectDialogOpen}
        comment={comment}
        setComment={setComment}
        onSubmit={handleRejectSubmit}
      />

      <FlagDialog 
        open={isFlagDialogOpen}
        onOpenChange={setIsFlagDialogOpen}
        selectedGoalId={selectedGoalId}
        flagReason={flagReason}
        setFlagReason={setFlagReason}
        onSubmit={handleFlagSubmit}
      />
    </div>
  );
};

export default ReviewPanel;
