import { useFileUpload } from './imports/useFileUpload';
import { useFieldMapping } from './imports/useFieldMapping';
import { useImportResults, ImportResults } from './imports/useImportResults';
import { useImportWorkflow, ImportStep } from './imports/useImportWorkflow';
import { useEffect } from 'react';

export type { ImportStep } from './imports/useImportWorkflow';
export type { ValidationError } from './imports/useFieldMapping';
export type { ImportResults } from './imports/useImportResults';

export interface EmployeeImportHook {
  currentStep: ImportStep;
  fileType: 'json' | 'xml' | 'csv' | null;
  uploadedFile: File | null;
  parsedData: any[];
  detectedFields: string[];
  mappedFields: Record<string, string>;
  mappingMethod: 'manual' | 'auto';
  manualFields: Array<{name: string, type: string}>;
  validationErrors: Record<string, string[]>;
  importResults: ImportResults | null;
  handleFileUpload: (file: File) => Promise<void>;
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
  const fileUpload = useFileUpload();
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
  
  // Reset all states when starting over
  const handleStartOver = () => {
    workflow.handleStartOver();
    importResults.resetResults();
  };
  
  return {
    // File upload states and methods
    fileType: fileUpload.fileType,
    uploadedFile: fileUpload.uploadedFile,
    parsedData: fileUpload.parsedData,
    detectedFields: fileUpload.detectedFields,
    
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
    currentStep: workflow.currentStep,
    setCurrentStep: workflow.setCurrentStep,
    handleFileUpload,
    handleMappingComplete: workflow.handleMappingComplete,
    handleConfirmImport: workflow.handleConfirmImport,
    handleStartOver
  };
};
