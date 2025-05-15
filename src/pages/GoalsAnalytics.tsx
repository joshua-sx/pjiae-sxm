
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const GoalsAnalytics = () => {
  const { role } = useAuth();
  const isDirector = role === 'Director';

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Goals Analytics</h1>
          <p className="text-muted-foreground mt-2">
            {isDirector 
              ? 'Analytics for division-level goals and performance' 
              : 'Comprehensive analytics on goals across the organization'}
          </p>
        </div>

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
