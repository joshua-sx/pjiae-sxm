
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AppraisalCardProps {
  id: string;
  title: string;
  status: 'draft' | 'pending' | 'approved' | 'flagged' | 'completed' | 'appealed';
  cycle: string;
  dueDate: string;
  employeeName?: string;
}

const AppraisalCard = ({ 
  id, 
  title, 
  status, 
  cycle,
  dueDate,
  employeeName
}: AppraisalCardProps) => {
  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(dueDate);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            {employeeName && <p className="text-sm text-gray-500">{employeeName}</p>}
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar size={14} className="mr-1" />
          <span>
            {cycle} - {daysRemaining > 0 
              ? `${daysRemaining} days remaining` 
              : "Past due"}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end">
          <Button asChild variant="outline" size="sm">
            <Link to={`/appraisal/${id}`}>
              View
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppraisalCard;
