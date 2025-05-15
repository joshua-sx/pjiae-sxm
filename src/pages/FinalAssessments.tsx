
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FinalAssessments = () => {
  const { role } = useAuth();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {role === 'Employee' ? 'My Final Assessment' : 'Final Assessments'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {role === 'Employee' 
              ? 'View your year-end performance assessment' 
              : 'Manage and track year-end performance assessments'}
          </p>
        </div>

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
