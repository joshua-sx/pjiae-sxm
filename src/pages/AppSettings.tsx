
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const AppSettings = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">App Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure application settings and feature toggles
          </p>
        </div>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Manage API keys and endpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" value="●●●●●●●●●●●●●●●●●●●●" readOnly />
                <p className="text-xs text-muted-foreground">Last updated: May 10, 2023</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input id="api-endpoint" defaultValue="https://api.pjiae-appraisal.com/v1" />
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline">Regenerate API Key</Button>
                <Button>Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Feature Toggles */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
            <CardDescription>
              Enable or disable system features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">360° Feedback</p>
                <p className="text-sm text-muted-foreground">
                  Allow employees to receive feedback from peers and reports
                </p>
              </div>
              <Switch id="360-feedback" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Goal Revision Requests</p>
                <p className="text-sm text-muted-foreground">
                  Allow employees to request revisions to assigned goals
                </p>
              </div>
              <Switch id="goal-revision" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Self-Assessment</p>
                <p className="text-sm text-muted-foreground">
                  Enable employee self-assessment in review cycles
                </p>
              </div>
              <Switch id="self-assessment" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">External Feedback Collection</p>
                <p className="text-sm text-muted-foreground">
                  Allow collection of feedback from external sources
                </p>
              </div>
              <Switch id="external-feedback" />
            </div>
            
            <div className="flex justify-end pt-2">
              <Button>Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AppSettings;
