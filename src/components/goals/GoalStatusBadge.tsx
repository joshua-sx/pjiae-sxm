
import { Badge } from "@/components/ui/badge";
import { GoalStatus } from "@/types/goals";

interface GoalStatusBadgeProps {
  status: GoalStatus;
}

const GoalStatusBadge = ({ status }: GoalStatusBadgeProps) => {
  const getStatusColor = (status: GoalStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-400 hover:bg-gray-500";
      case "submitted":
        return "bg-blue-500 hover:bg-blue-600";
      case "flagged":
        return "bg-amber-500 hover:bg-amber-600";
      case "approved":
        return "bg-green-500 hover:bg-green-600";
      case "in-progress":
        return "bg-purple-500 hover:bg-purple-600";
      case "completed":
        return "bg-teal-500 hover:bg-teal-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getStatusLabel = (status: GoalStatus) => {
    switch (status) {
      case "draft":
        return "Draft";
      case "submitted":
        return "Submitted";
      case "flagged":
        return "Flagged";
      case "approved":
        return "Approved";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
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
