
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { useEmployeeImport } from '@/hooks/useEmployeeImport';

import { ImportSteps } from '@/components/imports/ImportSteps';
import { UploadStep } from '@/components/imports/steps/UploadStep';
import { MappingStep } from '@/components/imports/steps/MappingStep';
import { PreviewStep } from '@/components/imports/steps/PreviewStep';
import { SummaryStep } from '@/components/imports/steps/SummaryStep';

const EmployeeImport = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    importSource,
    parsedData,
    detectedFields,
    mappedFields,
    validationErrors,
    importResults,
    
    // File upload
    handleFileUpload,
    
    // API import
    apiConfig,
    isConnecting,
    isConnected,
    updateApiConfig,
    testApiConnection,
    fetchApiData,
    
    // Common methods
    setImportSource,
    handleFieldMappingChange,
    handleMappingMethodChange,
    handleMappingComplete,
    handleConfirmImport,
    handleStartOver,
  } = useEmployeeImport();
  
  const renderStepContent = () => {
    switch(currentStep) {
      case 'upload':
        return (
          <UploadStep 
            importSource={importSource}
            onSourceSelect={setImportSource}
            onFileUpload={handleFileUpload}
            apiConfig={apiConfig}
            isConnecting={isConnecting}
            isConnected={isConnected}
            onApiConfigChange={updateApiConfig}
            onTestConnection={testApiConnection}
            onFetchApiData={fetchApiData}
          />
        );
      
      case 'mapping':
        return (
          <MappingStep 
            detectedFields={detectedFields}
            mappedFields={mappedFields}
            onMappingChange={handleFieldMappingChange}
            onMappingMethodChange={handleMappingMethodChange}
            validationErrors={validationErrors}
            sampleData={parsedData}
            onBack={handleStartOver}
            onContinue={handleMappingComplete}
          />
        );
        
      case 'preview':
        return (
          <PreviewStep 
            data={parsedData} 
            mappedFields={mappedFields} 
            onBack={() => handleStartOver()}
            onConfirm={handleConfirmImport}
          />
        );
        
      case 'summary':
        if (!importResults) return null;
        return (
          <SummaryStep 
            results={importResults}
            onStartOver={handleStartOver}
          />
        );
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Import Employees"
          subtitle="Bulk import employee records from external files or APIs"
          actions={
            currentStep !== 'upload' && (
              <Button variant="outline" onClick={handleStartOver}>
                Cancel
              </Button>
            )
          }
        />
        
        <ImportSteps currentStep={currentStep} />
        
        {renderStepContent()}
      </div>
    </MainLayout>
  );
};

export default EmployeeImport;
