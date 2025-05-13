
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, CartesianGrid, XAxis, YAxis
} from 'recharts';
import { bonusPrediction, chartConfig } from '@/data/reportData';
import { 
  ChartContainer, ChartTooltip, ChartTooltipContent, 
  ChartLegend, ChartLegendContent 
} from '@/components/ui/chart';
import { TrendingUpIcon, ChartBarIcon } from 'lucide-react';

export const BonusProjectionsTab: React.FC = () => {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bonus Budget Projections</CardTitle>
          <CardDescription>Historical and projected bonus allocations for upcoming years</CardDescription>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig}>
              <BarChart data={bonusPrediction} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={{
                    fill: "rgba(0, 0, 0, 0.05)",
                  }}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="actual" fill="#0A66C2" name="actual" />
                <Bar dataKey="predicted" fill="#8B5CF6" name="predicted" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Factors Affecting Bonus Projections</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <TrendingUpIcon className="mt-0.5 text-green-600 shrink-0" />
                <div>
                  <p className="font-medium">Performance Improvements</p>
                  <p className="text-muted-foreground text-sm">Overall company performance is projected to increase by 7.5%, contributing to higher bonus allocations</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ChartBarIcon className="mt-0.5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-medium">Company Growth</p>
                  <p className="text-muted-foreground text-sm">Expected revenue growth of 12% will increase the available budget for employee bonuses</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ChartBarIcon className="mt-0.5 text-amber-600 shrink-0" />
                <div>
                  <p className="font-medium">New Incentive Structure</p>
                  <p className="text-muted-foreground text-sm">Improved performance-based incentive structure will target high-performing employees</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Bonus Distribution Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium shrink-0">1</div>
                <div>
                  <p className="font-medium">Increase allocation for top performers</p>
                  <p className="text-muted-foreground text-sm">Focus 50% of bonus allocation on employees with performance scores above 85%</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium shrink-0">2</div>
                <div>
                  <p className="font-medium">Balance departmental allocations</p>
                  <p className="text-muted-foreground text-sm">Adjust IT and Operations allocations based on improved performance metrics</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium shrink-0">3</div>
                <div>
                  <p className="font-medium">Consider non-monetary incentives</p>
                  <p className="text-muted-foreground text-sm">Supplement financial bonuses with opportunities for growth and recognition</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
