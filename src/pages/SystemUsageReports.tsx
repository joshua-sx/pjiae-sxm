
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';

const SystemUsageReports = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Usage Reports</h1>
            <p className="text-muted-foreground mt-2">
              Monitor system usage patterns and activity
            </p>
          </div>
          
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
        </div>

        {/* Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Users</CardTitle>
              <CardDescription>Daily active users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">247</div>
              <p className="text-sm text-green-600 flex items-center">
                <span className="mr-1">↑</span> 12% increase from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Sessions</CardTitle>
              <CardDescription>Number of user sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,345</div>
              <p className="text-sm text-green-600 flex items-center">
                <span className="mr-1">↑</span> 8% increase from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Session Duration</CardTitle>
              <CardDescription>Average time spent in system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18:24</div>
              <p className="text-sm text-amber-600 flex items-center">
                <span className="mr-1">↓</span> 3% decrease from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Usage</CardTitle>
            <CardDescription>
              Most frequently used features and functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Goal Management</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Performance Reviews</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Reports & Analytics</span>
                  <span className="text-sm font-medium">63%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '63%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">User Management</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>
              Generate and download detailed system usage reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Monthly User Activity</p>
                  <p className="text-sm text-muted-foreground">
                    Detailed information on user logins, session duration, and feature usage
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Resource Consumption</p>
                  <p className="text-sm text-muted-foreground">
                    System resource usage including CPU, memory, and storage
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">API Usage</p>
                  <p className="text-sm text-muted-foreground">
                    API endpoints called, response times, and error rates
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SystemUsageReports;
