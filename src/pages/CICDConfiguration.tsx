
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const CICDConfiguration = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">CI/CD Configuration</h1>
          <p className="text-muted-foreground mt-2">
            Manage continuous integration and deployment settings
          </p>
        </div>

        {/* Pipeline Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Configuration</CardTitle>
            <CardDescription>
              Configure CI/CD pipeline settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="repo-url">Repository URL</Label>
                <Input 
                  id="repo-url" 
                  defaultValue="https://github.com/pjiae/digital-appraisal-system" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="branch">Default Branch</Label>
                <Input id="branch" defaultValue="main" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook URL</Label>
                <div className="flex">
                  <Input 
                    id="webhook" 
                    value="https://ci.pjiae.com/hooks/digital-appraisal"
                    readOnly
                    className="rounded-r-none" 
                  />
                  <Button variant="outline" className="rounded-l-none">
                    Copy
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button>Save Configuration</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Deployment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Deployment Settings</CardTitle>
            <CardDescription>
              Configure how updates are deployed to production
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Deployments</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically deploy changes when merged to the main branch
                  </p>
                </div>
                <Switch id="auto-deploy" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Manual Approval</p>
                  <p className="text-sm text-muted-foreground">
                    Require admin approval before deploying to production
                  </p>
                </div>
                <Switch id="manual-approval" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Run Database Migrations</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically run database migrations during deployment
                  </p>
                </div>
                <Switch id="db-migrations" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Backup Before Deployment</p>
                  <p className="text-sm text-muted-foreground">
                    Create a system backup before deploying new changes
                  </p>
                </div>
                <Switch id="backup-deploy" defaultChecked />
              </div>
              
              <div className="flex justify-end pt-2">
                <Button>Save Settings</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment History */}
        <Card>
          <CardHeader>
            <CardTitle>Deployment History</CardTitle>
            <CardDescription>
              View recent deployments and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">v1.4.2 - Feature Release</p>
                  <p className="text-sm text-muted-foreground">Deployed: May 12, 2023 at 4:30 PM</p>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Successful</div>
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">v1.4.1 - Hotfix</p>
                  <p className="text-sm text-muted-foreground">Deployed: May 8, 2023 at 11:15 AM</p>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Successful</div>
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">v1.4.0 - Major Update</p>
                  <p className="text-sm text-muted-foreground">Deployed: May 1, 2023 at 9:00 AM</p>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Successful</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CICDConfiguration;
