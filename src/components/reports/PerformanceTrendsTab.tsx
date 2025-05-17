
import React from 'react';
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis
} from 'recharts';
import { performanceData, chartConfig } from '@/data/reportData';
import { 
  ChartContainer, ChartTooltip, ChartTooltipContent, 
  ChartLegend, ChartLegendContent 
} from '@/components/ui/chart';
import { EnhancedCard } from '@/components/ui/enhanced-card';

export const PerformanceTrendsTab: React.FC = () => {
  return (
    <EnhancedCard
      title="Performance Trends Over Time"
      description="Comparison of actual performance against targets and previous year"
    >
      <div className="h-[400px] w-full">
        <ChartContainer config={chartConfig}>
          <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{
                stroke: "#9ca3af",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="actual" name="actual" stroke="#0A66C2" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="target" name="target" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="previousYear" name="previousYear" stroke="#64748B" strokeWidth={1.5} dot={{ r: 3 }} />
          </LineChart>
        </ChartContainer>
      </div>
    </EnhancedCard>
  );
};
