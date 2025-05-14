
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Flag } from "lucide-react";

interface FlagCommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
  goalTitle: string;
}

const FlagCommentDialog = ({
  isOpen,
  onClose,
  onSubmit,
  goalTitle,
}: FlagCommentDialogProps) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // Submit the comment
    onSubmit(comment);
    
    // Reset and close
    setComment('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-amber-500" />
            <span>Flag Goal for Review</span>
          </DialogTitle>
          <DialogDescription>
            Please provide a reason why this goal needs review. Your comment will be visible to the goal creator.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h4 className="font-medium">Goal Title:</h4>
            <p className="text-sm text-muted-foreground">{goalTitle}</p>
          </div>
          <Textarea
            placeholder="Please explain why this goal needs review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!comment.trim() || isSubmitting}
            className="bg-amber-500 hover:bg-amber-600"
          >
            {isSubmitting ? "Submitting..." : "Submit Flag"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlagCommentDialog;
