
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FlagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedGoalId: string | null;
  flagReason: string;
  setFlagReason: (reason: string) => void;
  onSubmit: () => void;
}

const FlagDialog = ({
  open,
  onOpenChange,
  selectedGoalId,
  flagReason,
  setFlagReason,
  onSubmit
}: FlagDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700" 
            onClick={onSubmit}
          >
            Flag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlagDialog;
