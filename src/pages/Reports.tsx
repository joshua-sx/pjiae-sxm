
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SummaryCards } from '@/components/reports/SummaryCards';
import { PerformanceTrendsTab } from '@/components/reports/PerformanceTrendsTab';
import { DepartmentAnalysisTab } from '@/components/reports/DepartmentAnalysisTab';
import { BonusProjectionsTab } from '@/components/reports/BonusProjectionsTab';
import { ReportControls } from '@/components/reports/ReportControls';
import { PageHeader } from '@/components/common/PageHeader';

const Reports = () => {
  const [timeframe, setTimeframe] = useState('yearly');
  const [department, setDepartment] = useState('all');
  
  return (
    <MainLayout>
      <div className="page-wrapper">
        <PageHeader
          title="Performance Analytics & Reporting"
          subtitle="Comprehensive analysis of organizational performance metrics"
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

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance Trends</TabsTrigger>
            <TabsTrigger value="department">Department Analysis</TabsTrigger>
            <TabsTrigger value="bonus">Bonus Projections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-6 pt-6">
            <PerformanceTrendsTab />
          </TabsContent>

          <TabsContent value="department" className="space-y-6 pt-6">
            <DepartmentAnalysisTab />
          </TabsContent>

          <TabsContent value="bonus" className="space-y-6 pt-6">
            <BonusProjectionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
