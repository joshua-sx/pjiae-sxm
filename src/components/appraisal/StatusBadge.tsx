
import { cn } from "@/lib/utils";

type StatusType = 'draft' | 'pending' | 'approved' | 'flagged' | 'completed' | 'appealed';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const STATUS_CLASSES: Record<StatusType, string> = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  flagged: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  appealed: "bg-purple-100 text-purple-800",
};

const STATUS_LABELS: Record<StatusType, string> = {
  draft: "Draft",
  pending: "Pending",
  approved: "Approved",
  flagged: "Flagged",
  completed: "Completed",
  appealed: "Appealed",
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        STATUS_CLASSES[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};

export default StatusBadge;
