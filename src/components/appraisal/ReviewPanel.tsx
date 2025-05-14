
import { useState } from "react";
import { AppraisalForm } from "@/types/appraisal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import { RatingDisplay } from "@/components/organization/RatingDisplay";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, Flag, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "../ui/card";

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
                      onClick={() => openFlagDialog(goal.id)}
                    >
                      <Flag size={16} className="mr-1" />
                      Flag
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {appraisal.ratings && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Performance Ratings</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(appraisal.ratings)
              .filter(([key]) => key !== 'overall')
              .map(([category, rating]) => (
                <div key={category} className="flex items-center justify-between border rounded p-3">
                  <span className="font-medium capitalize">{category}</span>
                  <RatingDisplay rating={rating} />
                </div>
              ))}
            {appraisal.ratings.overall && (
              <div className="col-span-2 flex items-center justify-between border rounded p-3 bg-gray-50">
                <span className="font-medium">Overall Rating</span>
                <RatingDisplay rating={appraisal.ratings.overall} />
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-3">Comments</h3>
        <div className="space-y-3">
          {appraisal.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded p-3">
              <div className="flex justify-between">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-gray-500">{comment.role}</span>
              </div>
              <p className="mt-1 text-sm">{comment.text}</p>
              <span className="text-xs text-gray-500 mt-2 block">{comment.date}</span>
            </div>
          ))}
        </div>
      </div>

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

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Revision</DialogTitle>
            <DialogDescription>
              Please provide a reason for requesting revisions to this appraisal.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter your comments here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRejectSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFlagDialogOpen} onOpenChange={setIsFlagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Flag for Review</DialogTitle>
            <DialogDescription>
              {selectedGoalId 
                ? "Please provide a reason for flagging this goal."
                : "Please provide a reason for flagging this appraisal."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter your reason here..."
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFlagDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-red-600 hover:bg-red-700" 
              onClick={handleFlagSubmit}
            >
              Flag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewPanel;
