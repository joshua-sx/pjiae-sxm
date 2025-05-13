
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Area, AreaChart, PieChart, Pie, BarChart, Bar, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';
import { ChevronUpIcon } from 'lucide-react';
import { performanceData, appraisalsByStatus, bonusPrediction, COLORS } from '@/data/reportData';

export const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PerformanceScoreCard />
      <CompletedAppraisalsCard />
      <BonusBudgetCard />
    </div>
  );
};

const PerformanceScoreCard: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Performance Score</span>
          <span className="text-2xl font-bold text-pjiae-blue">85%</span>
        </CardTitle>
        <CardDescription className="flex items-center">
          <span className="flex items-center text-green-600">
            <ChevronUpIcon size={18} />
            <span className="ml-1">5% from last period</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData.slice(-6)} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0A66C2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="actual" stroke="#0A66C2" fill="url(#colorActual)" />
              <Tooltip content={<></>} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const CompletedAppraisalsCard: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Completed Appraisals</span>
          <span className="text-2xl font-bold text-pjiae-blue">58%</span>
        </CardTitle>
        <CardDescription className="flex items-center">
          <span className="flex items-center text-amber-600">
            <ChevronUpIcon size={18} />
            <span className="ml-1">12% from last month</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={appraisalsByStatus}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={45}
                paddingAngle={2}
                dataKey="value"
              >
                {appraisalsByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<></>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const BonusBudgetCard: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Projected Bonus Budget</span>
          <span className="text-2xl font-bold text-pjiae-blue">$1.05M</span>
        </CardTitle>
        <CardDescription className="flex items-center">
          <span className="flex items-center text-green-600">
            <ChevronUpIcon size={18} />
            <span className="ml-1">10.5% increase for next year</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bonusPrediction} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
              <Bar dataKey="predicted" fill="#8B5CF6" />
              <Tooltip content={<></>} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
