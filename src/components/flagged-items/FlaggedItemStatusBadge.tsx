
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface FlaggedItemStatusBadgeProps {
  status: 'flagged' | 'resolved' | 'in-progress';
}

export const FlaggedItemStatusBadge = ({ status }: FlaggedItemStatusBadgeProps) => {
  switch(status) {
    case 'flagged':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          <AlertTriangle size={12} className="mr-1" /> Flagged
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
          <Clock size={12} className="mr-1" /> In Progress
        </Badge>
      );
    case 'resolved':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle size={12} className="mr-1" /> Resolved
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};
