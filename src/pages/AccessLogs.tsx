
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';

const AccessLogs = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Access Logs"
          subtitle="View and analyze user access records"
          actions={
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          }
        />
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search logs by user, action or date..."
              className="pl-8"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        {/* Placeholder content - would be replaced with actual logs */}
        <Card>
          <CardHeader>
            <CardTitle>Access Records</CardTitle>
            <CardDescription>System access activities and authentication events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display system access logs with filtering and export capabilities.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AccessLogs;
