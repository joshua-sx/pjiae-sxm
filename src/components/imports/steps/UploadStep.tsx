
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUploader } from '@/components/imports/FileUploader';
import { ImportSourceSelector } from '@/components/imports/ImportSourceSelector';
import { ApiImportForm } from '@/components/imports/steps/ApiImportForm';
import { ApiConfig, ImportSource } from '@/hooks/useEmployeeImport';

interface UploadStepProps {
  importSource: ImportSource;
  onSourceSelect: (source: ImportSource) => void;
  
  // File upload props
  onFileUpload: (file: File) => Promise<void>;
  
  // API import props
  apiConfig?: ApiConfig;
  isConnecting?: boolean;
  isConnected?: boolean;
  onApiConfigChange?: (config: Partial<ApiConfig>) => void;
  onTestConnection?: () => Promise<void>;
  onFetchApiData?: () => Promise<void>;
}

export const UploadStep = ({ 
  importSource, 
  onSourceSelect,
  onFileUpload,
  apiConfig,
  isConnecting,
  isConnected,
  onApiConfigChange,
  onTestConnection,
  onFetchApiData
}: UploadStepProps) => {
  
  // If no import source is selected, show the selection screen
  if (!importSource) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Import Employees</CardTitle>
          <CardDescription>
            Choose a method to import employee data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImportSourceSelector onSourceSelect={onSourceSelect} />
        </CardContent>
      </Card>
    );
  }
  
  // If file upload is selected
  if (importSource === 'file') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Import from File</CardTitle>
          <CardDescription>
            Upload a CSV, JSON, or XML file containing employee data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader onFileUpload={onFileUpload} />
        </CardContent>
      </Card>
    );
  }
  
  // If API import is selected
  if (importSource === 'api' && apiConfig && onApiConfigChange && onTestConnection && onFetchApiData) {
    return (
      <ApiImportForm
        apiConfig={apiConfig}
        isLoading={isConnecting || false}
        isConnected={isConnected || false}
        onConfigChange={onApiConfigChange}
        onTestConnection={onTestConnection}
        onFetchData={onFetchApiData}
      />
    );
  }
  
  return null;
};
