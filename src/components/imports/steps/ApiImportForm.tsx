
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { EnhancedTextarea } from '@/components/ui/enhanced-textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FormField } from '@/components/ui/form-field';
import { ApiConfig, AuthType, HttpMethod } from '@/hooks/useEmployeeImport';
import { Link, Network, Lock, Key, Database } from 'lucide-react';

interface ApiImportFormProps {
  apiConfig: ApiConfig;
  isLoading: boolean;
  isConnected: boolean;
  onConfigChange: (config: Partial<ApiConfig>) => void;
  onTestConnection: () => Promise<void>;
  onFetchData: () => Promise<void>;
}

export const ApiImportForm = ({
  apiConfig,
  isLoading,
  isConnected,
  onConfigChange,
  onTestConnection,
  onFetchData
}: ApiImportFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import from API Endpoint</CardTitle>
        <CardDescription>
          Connect to an external API to import employee data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Basic API Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">API Endpoint</h3>
            
            <EnhancedInput
              id="api-url"
              label="API URL"
              placeholder="https://company-hr.api.com/employees"
              value={apiConfig.url}
              onChange={(e) => onConfigChange({ url: e.target.value })}
              required
              icon={<Link className="h-4 w-4" />}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Select 
                value={apiConfig.method} 
                onValueChange={(value) => onConfigChange({ method: value as HttpMethod })}
              >
                <FormField id="http-method" label="HTTP Method">
                  <SelectTrigger>
                    <SelectValue placeholder="Select HTTP Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                  </SelectContent>
                </FormField>
              </Select>
            </div>
          </div>
          
          {/* Authentication */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Authentication</h3>
            
            <Select 
              value={apiConfig.authType} 
              onValueChange={(value) => onConfigChange({ authType: value as AuthType })}
            >
              <FormField id="auth-type" label="Authentication Type">
                <SelectTrigger>
                  <SelectValue placeholder="Select Authentication Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Authentication</SelectItem>
                  <SelectItem value="apiKey">API Key</SelectItem>
                  <SelectItem value="basicAuth">Basic Auth</SelectItem>
                  <SelectItem value="customHeader">Custom Header</SelectItem>
                  <SelectItem value="oauth2">OAuth 2.0 (Coming Soon)</SelectItem>
                </SelectContent>
              </FormField>
            </Select>
            
            {/* API Key Fields */}
            {apiConfig.authType === 'apiKey' && (
              <div className="space-y-4">
                <EnhancedInput
                  id="api-key-name"
                  label="API Key Header Name"
                  placeholder="X-API-KEY"
                  value={apiConfig.apiKeyName || ''}
                  onChange={(e) => onConfigChange({ apiKeyName: e.target.value })}
                  icon={<Key className="h-4 w-4" />}
                />
                
                <EnhancedInput
                  id="api-key-value"
                  label="API Key Value"
                  type="password"
                  value={apiConfig.apiKeyValue || ''}
                  onChange={(e) => onConfigChange({ apiKeyValue: e.target.value })}
                  icon={<Key className="h-4 w-4" />}
                />
              </div>
            )}
            
            {/* Basic Auth Fields */}
            {apiConfig.authType === 'basicAuth' && (
              <div className="space-y-4">
                <EnhancedInput
                  id="username"
                  label="Username"
                  value={apiConfig.username || ''}
                  onChange={(e) => onConfigChange({ username: e.target.value })}
                  icon={<Lock className="h-4 w-4" />}
                />
                
                <EnhancedInput
                  id="password"
                  label="Password"
                  type="password"
                  value={apiConfig.password || ''}
                  onChange={(e) => onConfigChange({ password: e.target.value })}
                  icon={<Lock className="h-4 w-4" />}
                />
              </div>
            )}
            
            {/* Custom Header Fields */}
            {apiConfig.authType === 'customHeader' && (
              <div className="space-y-4">
                <EnhancedInput
                  id="header-name"
                  label="Header Name"
                  placeholder="Authorization"
                  value={apiConfig.customHeaderName || ''}
                  onChange={(e) => onConfigChange({ customHeaderName: e.target.value })}
                  icon={<Network className="h-4 w-4" />}
                />
                
                <EnhancedInput
                  id="header-value"
                  label="Header Value"
                  placeholder="Bearer token123..."
                  value={apiConfig.customHeaderValue || ''}
                  onChange={(e) => onConfigChange({ customHeaderValue: e.target.value })}
                  icon={<Network className="h-4 w-4" />}
                />
              </div>
            )}
          </div>
          
          {/* Advanced Options */}
          <Tabs defaultValue="pagination">
            <TabsList className="w-full">
              <TabsTrigger value="pagination" className="flex-1">Pagination</TabsTrigger>
              <TabsTrigger value="params" className="flex-1">Query Parameters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pagination" className="pt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="pagination-enabled"
                  checked={apiConfig.pagination?.enabled || false}
                  onCheckedChange={(checked) => onConfigChange({ 
                    pagination: { ...apiConfig.pagination, enabled: checked } 
                  })}
                />
                <label htmlFor="pagination-enabled">Enable Pagination</label>
              </div>
              
              {apiConfig.pagination?.enabled && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <EnhancedInput
                      id="page-param"
                      label="Page Parameter"
                      placeholder="page"
                      value={apiConfig.pagination?.pageParam || ''}
                      onChange={(e) => onConfigChange({ 
                        pagination: { ...apiConfig.pagination, pageParam: e.target.value } 
                      })}
                      icon={<Database className="h-4 w-4" />}
                    />
                    
                    <EnhancedInput
                      id="limit-param"
                      label="Limit Parameter"
                      placeholder="limit"
                      value={apiConfig.pagination?.limitParam || ''}
                      onChange={(e) => onConfigChange({ 
                        pagination: { ...apiConfig.pagination, limitParam: e.target.value } 
                      })}
                      icon={<Database className="h-4 w-4" />}
                    />
                  </div>
                  
                  <EnhancedInput
                    id="page-size"
                    label="Page Size"
                    type="number"
                    min={1}
                    value={apiConfig.pagination?.pageSize?.toString() || ''}
                    onChange={(e) => onConfigChange({ 
                      pagination: { ...apiConfig.pagination, pageSize: parseInt(e.target.value) } 
                    })}
                    icon={<Database className="h-4 w-4" />}
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="params" className="pt-4">
              <EnhancedTextarea
                id="query-params"
                label="Query Parameters (JSON format)"
                placeholder='{"department": "sales", "active": true}'
                value={JSON.stringify(apiConfig.queryParams || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const params = JSON.parse(e.target.value);
                    onConfigChange({ queryParams: params });
                  } catch (err) {
                    // Handle invalid JSON input
                  }
                }}
                rows={5}
              />
            </TabsContent>
          </Tabs>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              variant="outline" 
              onClick={onTestConnection}
              disabled={isLoading || !apiConfig.url}
            >
              Test Connection
            </Button>
            
            <Button
              onClick={onFetchData}
              disabled={isLoading || !apiConfig.url}
            >
              {isConnected ? "Fetch Data" : "Connect & Fetch Data"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
