
import { Badge } from "@/components/ui/badge";
import { GoalStatus } from "@/types/goals";

interface GoalStatusBadgeProps {
  status: GoalStatus;
}

const GoalStatusBadge = ({ status }: GoalStatusBadgeProps) => {
  const getStatusColor = (status: GoalStatus) => {
    switch (status) {
      case "submitted":
        return "bg-blue-500 hover:bg-blue-600";
      case "flagged":
        return "bg-amber-500 hover:bg-amber-600";
      case "approved":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getStatusLabel = (status: GoalStatus) => {
    switch (status) {
      case "submitted":
        return "Submitted";
      case "flagged":
        return "Flagged";
      case "approved":
        return "Approved";
      default:
        return status;
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} capitalize`}>
      {getStatusLabel(status)}
    </Badge>
  );
};

export default GoalStatusBadge;
