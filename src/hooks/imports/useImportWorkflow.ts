
import { useState } from 'react';
import { useFileUpload, FileType } from './useFileUpload';
import { useFieldMapping } from './useFieldMapping';
import { useImportResults } from './useImportResults';

export type ImportStep = 'upload' | 'mapping' | 'preview' | 'summary';

export interface ImportWorkflowHook {
  currentStep: ImportStep;
  setCurrentStep: (step: ImportStep) => void;
  handleStartOver: () => void;
  handleMappingComplete: () => void;
  handleConfirmImport: () => void;
}

export const useImportWorkflow = (
  fileUpload: ReturnType<typeof useFileUpload>,
  fieldMapping: ReturnType<typeof useFieldMapping>,
  importResults: ReturnType<typeof useImportResults>
): ImportWorkflowHook => {
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload');
  
  const handleStartOver = () => {
    setCurrentStep('upload');
  };
  
  const handleMappingComplete = () => {
    if (fieldMapping.validateMappings(fileUpload.parsedData)) {
      setCurrentStep('preview');
    }
  };
  
  const handleConfirmImport = () => {
    importResults.processImport(fileUpload.parsedData, fieldMapping.mappedFields);
    setCurrentStep('summary');
  };
  
  return {
    currentStep,
    setCurrentStep,
    handleStartOver,
    handleMappingComplete,
    handleConfirmImport
  };
};
