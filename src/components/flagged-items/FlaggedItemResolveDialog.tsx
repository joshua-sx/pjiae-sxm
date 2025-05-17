
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EnhancedTextarea } from "@/components/ui/enhanced-textarea";
import { CheckCircle } from "lucide-react";

interface FlaggedItemResolveDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  resolutionNote: string;
  setResolutionNote: (note: string) => void;
  onResolveSubmit: () => void;
}

export const FlaggedItemResolveDialog = ({
  isOpen,
  onOpenChange,
  resolutionNote,
  setResolutionNote,
  onResolveSubmit,
}: FlaggedItemResolveDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <div>
            <DialogTitle>Resolve Flagged Item</DialogTitle>
            <DialogDescription>
              Please provide details about how this issue was resolved.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="py-4">
          <EnhancedTextarea
            id="resolution-note"
            label="Resolution Details"
            placeholder="Enter resolution details..."
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-success hover:bg-success/90"
            onClick={onResolveSubmit}
          >
            <CheckCircle size={16} className="mr-2" />
            Confirm Resolution
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
