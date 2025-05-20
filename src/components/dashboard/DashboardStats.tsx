
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-pjiae-blue">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <div className="flex items-center pt-1">
            <span
              className={`text-xs ${
                trend.positive ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend.positive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">from last cycle</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  stats: {
    pendingAppraisals: number;
    completedAppraisals: number;
    averageScore: number | string;
    daysUntilDeadline: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Pending Appraisals"
        value={stats.pendingAppraisals}
        icon={<span className="text-yellow-500">●</span>}
      />
      <StatCard
        title="Completed Appraisals"
        value={stats.completedAppraisals}
        trend={{ value: 12, positive: true }}
        icon={<span className="text-green-500">●</span>}
      />
      <StatCard
        title="Average Score"
        value={stats.averageScore}
        description="Across all employees"
        trend={{ value: 3, positive: true }}
        icon={<span className="text-blue-500">●</span>}
      />
      <StatCard
        title="Days Until Deadline"
        value={stats.daysUntilDeadline}
        description="Current cycle"
        icon={<span className="text-purple-500">●</span>}
      />
    </div>
  );
};

export default DashboardStats;
