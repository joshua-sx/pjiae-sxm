
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resolve Flagged Item</DialogTitle>
          <DialogDescription>
            Please provide details about how this issue was resolved.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Enter resolution details..."
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={onResolveSubmit}
          >
            <CheckCircle size={16} className="mr-1" />
            Confirm Resolution
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
