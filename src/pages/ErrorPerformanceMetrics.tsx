
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertOctagon, Calendar } from 'lucide-react';

const ErrorPerformanceMetrics = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Error & Performance Metrics</h1>
            <p className="text-muted-foreground mt-2">
              Monitor system errors and performance indicators
            </p>
          </div>
          
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Error Rate</CardTitle>
              <CardDescription>Average system-wide error rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0.28%</div>
              <p className="text-sm text-green-600 flex items-center">
                <span className="mr-1">↓</span> 0.15% decrease from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Response Time</CardTitle>
              <CardDescription>API endpoint response time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">125ms</div>
              <p className="text-sm text-green-600 flex items-center">
                <span className="mr-1">↓</span> 15ms improvement from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Page Load Time</CardTitle>
              <CardDescription>Average frontend load time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.45s</div>
              <p className="text-sm text-amber-600 flex items-center">
                <span className="mr-1">↑</span> 0.12s increase from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Critical Errors</CardTitle>
              <CardDescription>Number of critical errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-green-600 flex items-center">
                <span className="mr-1">↓</span> 2 fewer than last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Errors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Recent Errors</CardTitle>
              <CardDescription>
                Most recent system errors that require attention
              </CardDescription>
            </div>
            <AlertOctagon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-1">
                <p className="font-medium">Database Connection Timeout</p>
                <p className="text-sm text-muted-foreground">
                  Connection to primary database timed out during peak hours
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-muted-foreground">Today at 14:35</p>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <p className="font-medium">API Rate Limit Exceeded</p>
                <p className="text-sm text-muted-foreground">
                  External API rate limit exceeded during batch operation
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-muted-foreground">Yesterday at 09:12</p>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <p className="font-medium">File Upload Failure</p>
                <p className="text-sm text-muted-foreground">
                  Document storage service rejected large file uploads
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-muted-foreground">May 14, 2023 at 16:28</p>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              System performance measurements over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This section will display performance metrics charts and trends over the selected time period.
            </p>
            
            <div className="h-60 w-full rounded-md bg-gray-50 flex items-center justify-center">
              <p className="text-muted-foreground">Performance charts will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ErrorPerformanceMetrics;
