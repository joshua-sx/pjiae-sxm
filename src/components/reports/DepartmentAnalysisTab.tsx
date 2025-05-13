
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip 
} from 'recharts';
import { 
  departmentPerformance, bonusAllocation, chartConfig, COLORS 
} from '@/data/reportData';
import { 
  ChartContainer, ChartTooltip, ChartTooltipContent, 
  ChartLegend, ChartLegendContent 
} from '@/components/ui/chart';

export const DepartmentAnalysisTab: React.FC = () => {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Department Performance Comparison</CardTitle>
          <CardDescription>Current performance scores by department relative to targets</CardDescription>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig}>
              <BarChart data={departmentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={{
                    fill: "rgba(0, 0, 0, 0.05)",
                  }}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="score" fill="#0A66C2" name="score" />
                <Bar dataKey="target" fill="#94A3B8" name="target" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bonus Allocation by Department</CardTitle>
          <CardDescription>Percentage of total bonus budget allocated to each department</CardDescription>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="w-full lg:w-[300px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bonusAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {bonusAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {bonusAllocation.map((dept, index) => (
                <div key={dept.name} className="flex items-center gap-2">
                  <span 
                    className="block w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span>{dept.name}: ${(dept.value * 10500).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
