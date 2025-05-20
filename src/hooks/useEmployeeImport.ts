
import { useFileUpload } from './imports/useFileUpload';
import { useFieldMapping } from './imports/useFieldMapping';
import { useImportResults, ImportResults } from './imports/useImportResults';
import { useImportWorkflow, ImportStep } from './imports/useImportWorkflow';
import { useApiImport, ApiConfig } from './imports/useApiImport';
import { useState } from 'react';

export type { ImportStep } from './imports/useImportWorkflow';
export type { ValidationError } from './imports/useFieldMapping';
export type { ImportResults } from './imports/useImportResults';
export type { ApiConfig, AuthType, HttpMethod } from './imports/useApiImport';

export type ImportSource = 'file' | 'api' | null;

export interface EmployeeImportHook {
  currentStep: ImportStep;
  importSource: ImportSource;
  // File import related
  fileType: 'json' | 'xml' | 'csv' | null;
  uploadedFile: File | null;
  // API import related
  apiConfig: ApiConfig;
  isConnecting: boolean;
  isConnected: boolean;
  // Shared data
  parsedData: any[];
  detectedFields: string[];
  mappedFields: Record<string, string>;
  mappingMethod: 'manual' | 'auto';
  manualFields: Array<{name: string, type: string}>;
  validationErrors: Record<string, string[]>;
  importResults: ImportResults | null;
  // File import methods
  handleFileUpload: (file: File) => Promise<void>;
  // API import methods
  updateApiConfig: (config: Partial<ApiConfig>) => void;
  testApiConnection: () => Promise<void>;
  fetchApiData: () => Promise<void>;
  // Common methods
  setImportSource: (source: ImportSource) => void;
  handleFieldMappingChange: (originalField: string, mappedField: string) => void;
  handleAddManualField: (field: {name: string, type: string}) => void;
  handleRemoveManualField: (index: number) => void;
  handleMappingMethodChange: (method: 'manual' | 'auto') => void;
  handleMappingComplete: () => void;
  handleConfirmImport: () => void;
  handleStartOver: () => void;
  setCurrentStep: (step: ImportStep) => void;
}

export const useEmployeeImport = (): EmployeeImportHook => {
  const [importSource, setImportSource] = useState<ImportSource>(null);
  const fileUpload = useFileUpload();
  const apiImport = useApiImport();
  const fieldMapping = useFieldMapping();
  const importResults = useImportResults();
  const workflow = useImportWorkflow(fileUpload, fieldMapping, importResults);
  
  // Handle file upload and set initial mappings
  const handleFileUpload = async (file: File) => {
    try {
      await fileUpload.handleFileUpload(file);
      // Auto-generate field mappings after successful upload
      fieldMapping.setInitialMappings(fileUpload.detectedFields);
      workflow.setCurrentStep('mapping');
    } catch (error) {
      // Error is already handled in the useFileUpload hook
    }
  };
  
  // Handle API connection testing
  const testApiConnection = async () => {
    const success = await apiImport.testConnection();
    if (success) {
      await fetchApiData();
    }
  };
  
  // Handle API data fetching and set initial mappings
  const fetchApiData = async () => {
    const success = await apiImport.fetchApiData();
    if (success) {
      // Auto-generate field mappings after successful data fetch
      fieldMapping.setInitialMappings(apiImport.detectedFields);
      workflow.setCurrentStep('mapping');
    }
  };
  
  // Reset all states when starting over
  const handleStartOver = () => {
    setImportSource(null);
    workflow.handleStartOver();
    importResults.resetResults();
  };
  
  // Determine which data to use based on import source
  const getParsedData = () => {
    return importSource === 'api' ? apiImport.apiData : fileUpload.parsedData;
  };
  
  // Determine which fields to use based on import source
  const getDetectedFields = () => {
    return importSource === 'api' ? apiImport.detectedFields : fileUpload.detectedFields;
  };
  
  return {
    // Common states
    currentStep: workflow.currentStep,
    importSource,
    parsedData: getParsedData(),
    detectedFields: getDetectedFields(),
    
    // File upload states and methods
    fileType: fileUpload.fileType,
    uploadedFile: fileUpload.uploadedFile,
    handleFileUpload,
    
    // API import states and methods
    apiConfig: apiImport.apiConfig,
    isConnecting: apiImport.isLoading,
    isConnected: apiImport.isConnected,
    updateApiConfig: apiImport.updateApiConfig,
    testApiConnection,
    fetchApiData,
    
    // Set import source
    setImportSource,
    
    // Field mapping states and methods
    mappedFields: fieldMapping.mappedFields,
    mappingMethod: fieldMapping.mappingMethod,
    manualFields: fieldMapping.manualFields,
    validationErrors: fieldMapping.validationErrors,
    handleFieldMappingChange: fieldMapping.handleFieldMappingChange,
    handleAddManualField: fieldMapping.handleAddManualField,
    handleRemoveManualField: fieldMapping.handleRemoveManualField,
    handleMappingMethodChange: fieldMapping.handleMappingMethodChange,
    
    // Import results
    importResults: importResults.importResults,
    
    // Workflow control
    setCurrentStep: workflow.setCurrentStep,
    handleMappingComplete: workflow.handleMappingComplete,
    handleConfirmImport: workflow.handleConfirmImport,
    handleStartOver
  };
};
