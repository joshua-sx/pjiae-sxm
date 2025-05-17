
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';
import { SummaryCards } from '@/components/reports/SummaryCards';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ReportControls } from '@/components/reports/ReportControls';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for final assessment reports
const assessmentData = [
  { department: 'HR', meetsExpectations: 65, exceedsExpectations: 15, needsImprovement: 20 },
  { department: 'IT', meetsExpectations: 70, exceedsExpectations: 20, needsImprovement: 10 },
  { department: 'Finance', meetsExpectations: 75, exceedsExpectations: 10, needsImprovement: 15 },
  { department: 'Operations', meetsExpectations: 60, exceedsExpectations: 25, needsImprovement: 15 },
  { department: 'Marketing', meetsExpectations: 55, exceedsExpectations: 30, needsImprovement: 15 },
];

const FinalAssessmentReports = () => {
  const [timeframe, setTimeframe] = useState('yearly');
  const [department, setDepartment] = useState('all');
  
  return (
    <MainLayout>
      <div className="page-wrapper">
        <PageHeader
          title="Final Assessment Reports"
          subtitle="Analytical reports on year-end performance assessments"
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
        
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="results">Assessment Results</TabsTrigger>
            <TabsTrigger value="completion">Completion Rates</TabsTrigger>
            <TabsTrigger value="trends">Year-over-Year Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results" className="space-y-6 pt-6">
            <EnhancedCard 
              title="Final Assessment Distribution by Department"
              description="Breakdown of assessment ratings across departments"
            >
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={assessmentData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="meetsExpectations" name="Meets Expectations" fill="#94A3B8" />
                    <Bar dataKey="exceedsExpectations" name="Exceeds Expectations" fill="#0A66C2" />
                    <Bar dataKey="needsImprovement" name="Needs Improvement" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </EnhancedCard>
          </TabsContent>

          <TabsContent value="completion" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Final Assessment Completion Rates</CardTitle>
                <CardDescription>Tracking completion status across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Completion rate analytics will be displayed here when available.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends Over Time</CardTitle>
                <CardDescription>Year-over-year comparison of performance assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Historical trends and year-over-year comparison charts will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FinalAssessmentReports;
