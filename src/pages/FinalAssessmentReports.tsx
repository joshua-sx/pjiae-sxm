
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';

const FinalAssessmentReports = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Final Assessment Reports"
          subtitle="Analytical reports on year-end performance assessments"
        />

        {/* Placeholder content - would be replaced with actual reports */}
        <Card>
          <CardHeader>
            <CardTitle>Year-End Performance Reports</CardTitle>
            <CardDescription>
              Analysis and statistics from final performance assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display reports and analytics from year-end performance assessments.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FinalAssessmentReports;
