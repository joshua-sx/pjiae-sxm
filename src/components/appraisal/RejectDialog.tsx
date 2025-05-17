
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

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
  onSubmit: () => void;
}

const RejectDialog = ({
  open,
  onOpenChange,
  comment,
  setComment,
  onSubmit
}: RejectDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Revision</DialogTitle>
          <DialogDescription>
            Please provide a reason for requesting revisions to this appraisal.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <EnhancedTextarea
            id="reject-comment"
            label="Revision Reason"
            placeholder="Enter your comments here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectDialog;
