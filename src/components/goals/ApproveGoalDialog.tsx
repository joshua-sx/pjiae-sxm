
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ApproveGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  goalTitle: string;
}

const ApproveGoalDialog = ({
  isOpen,
  onClose,
  onConfirm,
  goalTitle,
}: ApproveGoalDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>Approve Goal</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this goal? This will change its status to "Approved".
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <h4 className="font-medium">Goal Title:</h4>
          <p className="text-sm text-muted-foreground">{goalTitle}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600"
          >
            Confirm Approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveGoalDialog;
