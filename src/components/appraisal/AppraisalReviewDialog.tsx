
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
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { PendingAppraisal } from '@/types/pendingAppraisal';

interface AppraisalReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAppraisal: PendingAppraisal | null;
  reviewAction: 'approve' | 'flag' | null;
  commentText: string;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
}

const AppraisalReviewDialog = ({
  isOpen,
  onOpenChange,
  selectedAppraisal,
  reviewAction,
  commentText,
  onCommentChange,
  onSubmit
}: AppraisalReviewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {reviewAction === 'approve' ? 'Approve Appraisal' : 'Flag Appraisal'}
          </DialogTitle>
          <DialogDescription>
            {reviewAction === 'approve' 
              ? 'Confirm approval of this appraisal submission.' 
              : 'Provide feedback on why this appraisal needs revision.'}
          </DialogDescription>
        </DialogHeader>
        
        {selectedAppraisal && (
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm font-medium mb-1">Employee</p>
              <p className="text-sm">{selectedAppraisal.employeeName}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Department</p>
              <p className="text-sm">{selectedAppraisal.departmentName}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Phase</p>
              <p className="text-sm">{selectedAppraisal.phase}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">
                {reviewAction === 'approve' ? 'Comment (Optional)' : 'Feedback for Revision (Required)'}
              </p>
              <Textarea
                placeholder={reviewAction === 'approve' 
                  ? "Add any comments about this approval..." 
                  : "Explain what needs to be revised..."}
                value={commentText}
                onChange={(e) => onCommentChange(e.target.value)}
                className="min-h-[120px]"
                required={reviewAction === 'flag'}
              />
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <XCircle className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={reviewAction === 'flag' && !commentText.trim()}
            className={reviewAction === 'approve' ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"}
          >
            {reviewAction === 'approve' ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirm Approval
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 mr-1" />
                Flag for Revision
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppraisalReviewDialog;
