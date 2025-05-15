
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload, Calendar } from 'lucide-react';

const BackupRestore = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Backup & Restore</h1>
          <p className="text-muted-foreground mt-2">
            Manage system backups and restore functionality
          </p>
        </div>

        {/* Backup Section */}
        <Card>
          <CardHeader>
            <CardTitle>Create Backup</CardTitle>
            <CardDescription>
              Generate a full system backup including database and configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Creating a backup will capture the current state of all system data, including user information, 
                appraisals, goals, and configuration settings.
              </p>
              
              <div className="flex justify-end">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Create Backup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Restore Section */}
        <Card>
          <CardHeader>
            <CardTitle>Restore System</CardTitle>
            <CardDescription>
              Restore the system from a previous backup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Restoring from a backup will revert the system to the state captured in the backup file.
                This action cannot be undone.
              </p>
              
              <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-md border-gray-300 p-6">
                <div className="text-center space-y-2">
                  <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    Drop backup file here or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Support for .zip or .bak files
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="destructive">
                  Restore System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backup History */}
        <Card>
          <CardHeader>
            <CardTitle>Backup History</CardTitle>
            <CardDescription>
              View and manage previous system backups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Full System Backup</p>
                    <p className="text-sm text-muted-foreground">May 15, 2023 at 03:00 AM</p>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Full System Backup</p>
                    <p className="text-sm text-muted-foreground">May 8, 2023 at 03:00 AM</p>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Full System Backup</p>
                    <p className="text-sm text-muted-foreground">May 1, 2023 at 03:00 AM</p>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BackupRestore;
