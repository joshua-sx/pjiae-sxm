
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';

const FinalAssessments = () => {
  const { role } = useAuth();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title={role === 'Employee' ? 'My Final Assessment' : 'Final Assessments'}
          subtitle={role === 'Employee' 
            ? 'View your year-end performance assessment' 
            : 'Manage and track year-end performance assessments'}
        />

        {/* Placeholder content - would be replaced with actual assessment components */}
        <Card>
          <CardHeader>
            <CardTitle>Final Assessments</CardTitle>
            <CardDescription>
              {role === 'Employee' 
                ? 'Your current final assessment status and details' 
                : 'List of final assessments requiring your attention'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display {role === 'Employee' ? 'your' : ''} final assessment details.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FinalAssessments;
