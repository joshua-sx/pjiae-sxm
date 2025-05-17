
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';
import { SummaryCards } from '@/components/reports/SummaryCards';
import { ReportControls } from '@/components/reports/ReportControls';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  ResponsiveContainer, Tooltip 
} from 'recharts';

// Sample data for mid-year reports
const midYearData = [
  { month: 'Jan', completion: 10, targetCompletion: 15 },
  { month: 'Feb', completion: 25, targetCompletion: 30 },
  { month: 'Mar', completion: 45, targetCompletion: 45 },
  { month: 'Apr', completion: 65, targetCompletion: 60 },
  { month: 'May', completion: 75, targetCompletion: 75 },
  { month: 'Jun', completion: 85, targetCompletion: 90 },
];

const MidYearReports = () => {
  const [timeframe, setTimeframe] = useState('quarterly');
  const [department, setDepartment] = useState('all');
  
  return (
    <MainLayout>
      <div className="page-wrapper">
        <PageHeader
          title="Mid-Year Reports"
          subtitle="Analytical reports on mid-year review performance"
          actions={
            <ReportControls 
              timeframe={timeframe} 
              setTimeframe={setTimeframe} 
              department={department} 
              setDepartment={setDepartment} 
            />
          }
        />

        <SummaryCards />
        
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">Goal Progress</TabsTrigger>
            <TabsTrigger value="completion">Review Completion</TabsTrigger>
            <TabsTrigger value="distribution">Rating Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="space-y-6 pt-6">
            <EnhancedCard 
              title="Mid-Year Goal Progress"
              description="Tracking of goal completion against targets"
            >
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={midYearData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
                      name="Actual Completion" 
                      stroke="#0A66C2" 
                      strokeWidth={2.5} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="targetCompletion" 
                      name="Target" 
                      stroke="#94A3B8" 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </EnhancedCard>
          </TabsContent>

          <TabsContent value="completion" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mid-Year Review Completion</CardTitle>
                <CardDescription>Status of mid-year review submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Completion rate analytics will be displayed here when available.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mid-Year Rating Distribution</CardTitle>
                <CardDescription>Distribution of performance ratings across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Rating distribution charts will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MidYearReports;
