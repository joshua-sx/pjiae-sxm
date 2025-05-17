
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EnhancedTextarea } from "@/components/ui/enhanced-textarea";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";

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
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center gap-2">
          <Flag className="h-5 w-5 text-amber-500" />
          <div>
            <DialogTitle>Flag for Review</DialogTitle>
            <DialogDescription>
              {selectedGoalId 
                ? "Please provide a reason for flagging this goal."
                : "Please provide a reason for flagging this appraisal."
              }
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="py-4">
          <EnhancedTextarea
            id="flag-reason"
            placeholder="Enter your reason here..."
            value={flagReason}
            onChange={(e) => setFlagReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700" 
            onClick={onSubmit}
          >
            <Flag className="mr-2 h-4 w-4" />
            Flag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlagDialog;
