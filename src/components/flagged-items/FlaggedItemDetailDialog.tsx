
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FlaggedItem } from "@/data/mockFlaggedItems";
import { CheckCircle } from "lucide-react";

interface FlaggedItemDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedItem: FlaggedItem | null;
  getStatusBadge: (status: string) => React.ReactNode;
  onInProgressClick: () => void;
  onResolveClick: () => void;
}

export const FlaggedItemDetailDialog = ({
  isOpen,
  onOpenChange,
  selectedItem,
  getStatusBadge,
  onInProgressClick,
  onResolveClick,
}: FlaggedItemDetailDialogProps) => {
  if (!selectedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Flagged Item Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Employee</p>
              <p>{selectedItem.employeeName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Department</p>
              <p>{selectedItem.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p className="capitalize">{selectedItem.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phase</p>
              <p>
                {selectedItem.phase === "goal-setting" && "Goal Setting"}
                {selectedItem.phase === "mid-year-review" && "Mid-Year Review"}
                {selectedItem.phase === "year-end-evaluation" && "Year-End Evaluation"}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Item</p>
            <p>{selectedItem.itemTitle}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Reason for Flag</p>
            <div className="bg-red-50 border border-red-100 rounded p-3 mt-1">
              <p>{selectedItem.flagReason}</p>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Flagged by: {selectedItem.flaggedBy}</span>
                <span>Date: {selectedItem.flagDate}</span>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Current Status</p>
            <div className="mt-1">
              {getStatusBadge(selectedItem.status)}
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-end space-x-2">
            {selectedItem.status !== "resolved" && (
              <>
                {selectedItem.status !== "in-progress" && (
                  <Button 
                    variant="outline"
                    onClick={onInProgressClick}
                  >
                    Mark as In Progress
                  </Button>
                )}
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={onResolveClick}
                >
                  <CheckCircle size={16} className="mr-1" />
                  Mark as Resolved
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
