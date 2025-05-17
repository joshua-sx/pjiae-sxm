
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/common/PageHeader';
import { ReportControls } from '@/components/reports/ReportControls';
import { SummaryCards } from '@/components/reports/SummaryCards';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip 
} from 'recharts';

// Sample data for goals analytics
const goalStatusData = [
  { name: 'Completed', value: 45, color: '#10B981' },
  { name: 'In Progress', value: 30, color: '#F59E0B' },
  { name: 'At Risk', value: 15, color: '#F97316' },
  { name: 'Not Started', value: 10, color: '#94A3B8' },
];

const GoalsAnalytics = () => {
  const { role } = useAuth();
  const isDirector = role === 'Director';
  const [timeframe, setTimeframe] = useState('yearly');
  const [department, setDepartment] = useState('all');

  return (
    <MainLayout>
      <div className="page-wrapper">
        <PageHeader
          title="Goals Analytics"
          subtitle={isDirector 
            ? 'Analytics for division-level goals and performance' 
            : 'Comprehensive analytics on goals across the organization'}
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
        
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">Goal Status</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="alignment">Strategic Alignment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status" className="space-y-6 pt-6">
            <EnhancedCard 
              title="Goal Status Distribution"
              description="Current status of all active goals"
            >
              <div className="h-[400px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={goalStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {goalStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </EnhancedCard>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Goal Category</CardTitle>
                <CardDescription>Progress metrics across different goal categories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Performance metrics by goal category will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alignment" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Strategic Alignment</CardTitle>
                <CardDescription>How goals align with organizational objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Strategic alignment visualizations will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GoalsAnalytics;
