
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/common/PageHeader';

const GoalsAnalytics = () => {
  const { role } = useAuth();
  const isDirector = role === 'Director';

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Goals Analytics"
          subtitle={isDirector 
            ? 'Analytics for division-level goals and performance' 
            : 'Comprehensive analytics on goals across the organization'}
        />

        {/* Placeholder content - would be replaced with actual analytics */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isDirector ? 'Division Goals Analytics' : 'Organization Goals Analytics'}
            </CardTitle>
            <CardDescription>
              Performance metrics and goal achievement statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display analytics and metrics related to {isDirector ? 'division' : 'organization'} goals.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GoalsAnalytics;
