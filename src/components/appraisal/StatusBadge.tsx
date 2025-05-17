
import { Badge } from "@/components/ui/badge";

export type StatusType = 'draft' | 'pending' | 'submitted' | 'approved' | 'flagged' | 'completed' | 'appealed' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const STATUS_LABELS: Record<StatusType, string> = {
  draft: "Draft",
  pending: "Pending",
  submitted: "Submitted",
  approved: "Approved",
  flagged: "Flagged",
  completed: "Completed",
  appealed: "Appealed",
  rejected: "Rejected"
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <Badge
      variant={status}
      className={className}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
};

export default StatusBadge;
