
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';

const MidYearReviews = () => {
  const { role } = useAuth();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title={role === 'Employee' ? 'My Mid-Year Review' : 'Mid-Year Reviews'}
          subtitle={role === 'Employee' 
            ? 'View your mid-year performance review' 
            : 'Manage and track mid-year performance reviews'}
        />

        {/* Placeholder content - would be replaced with actual review components */}
        <Card>
          <CardHeader>
            <CardTitle>Mid-Year Reviews</CardTitle>
            <CardDescription>
              {role === 'Employee' 
                ? 'Your current mid-year review status and details' 
                : 'List of mid-year reviews requiring your attention'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display {role === 'Employee' ? 'your' : ''} mid-year review details.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MidYearReviews;
