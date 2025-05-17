
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Flag, CheckCircle } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: number;
  iconColor: string;
}

const StatCard = ({ icon, title, description, value, iconColor }: StatCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2">
        <span className={iconColor}>{icon}</span>
        <span>{title}</span>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

interface HRGoalsSummaryStatsProps {
  submittedCount: number;
  flaggedCount: number;
  approvedCount: number;
}

export const HRGoalsSummaryStats = ({ 
  submittedCount, 
  flaggedCount, 
  approvedCount 
}: HRGoalsSummaryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        icon={<Clock className="h-5 w-5" />}
        title="Pending Review"
        description="Goals awaiting HR review"
        value={submittedCount}
        iconColor="text-blue-500"
      />
      
      <StatCard
        icon={<Flag className="h-5 w-5" />}
        title="Flagged"
        description="Goals flagged for revisions"
        value={flaggedCount}
        iconColor="text-amber-500"
      />
      
      <StatCard
        icon={<CheckCircle className="h-5 w-5" />}
        title="Approved"
        description="Goals approved by HR"
        value={approvedCount}
        iconColor="text-green-500"
      />
    </div>
  );
};
