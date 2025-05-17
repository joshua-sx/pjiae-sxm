
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';

const MidYearReports = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Mid-Year Reports"
          subtitle="Analytical reports on mid-year review performance"
        />

        {/* Placeholder content - would be replaced with actual reports */}
        <Card>
          <CardHeader>
            <CardTitle>Mid-Year Performance Reports</CardTitle>
            <CardDescription>
              Analysis and statistics from mid-year performance reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display reports and analytics from mid-year performance reviews.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MidYearReports;
