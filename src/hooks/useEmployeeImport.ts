
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { parseCsv, parseJson, parseXml } from '@/utils/fileParser';

export type ImportStep = 'upload' | 'mapping' | 'preview' | 'summary';

export interface ValidationError {
  field: string;
  errors: string[];
}

export interface ImportResults {
  total: number;
  successful: number;
  failed: number;
  errors: Array<{row: number, error: string}>;
}

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
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload');
  const [fileType, setFileType] = useState<'json' | 'xml' | 'csv' | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [detectedFields, setDetectedFields] = useState<string[]>([]);
  const [mappedFields, setMappedFields] = useState<Record<string, string>>({});
  const [mappingMethod, setMappingMethod] = useState<'manual' | 'auto'>('auto');
  const [manualFields, setManualFields] = useState<Array<{name: string, type: string}>>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [importResults, setImportResults] = useState<ImportResults | null>(null);
  
  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    
    try {
      let data: any[] = [];
      
      // Determine file type from extension
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension === 'json') {
        setFileType('json');
        data = await parseJson(file);
      } else if (extension === 'xml') {
        setFileType('xml');
        data = await parseXml(file);
      } else if (extension === 'csv') {
        setFileType('csv');
        data = await parseCsv(file);
      } else {
        throw new Error('Unsupported file format. Please use JSON, XML, or CSV.');
      }
      
      if (!data.length) {
        throw new Error('No data found in the file.');
      }
      
      setParsedData(data);
      
      // Detect fields from the data
      const fields = Object.keys(data[0]);
      setDetectedFields(fields);
      
      // Auto-generate field mappings
      const initialMappings: Record<string, string> = {};
      fields.forEach(field => {
        initialMappings[field] = field;
      });
      setMappedFields(initialMappings);
      
      setCurrentStep('mapping');
      
      toast({
        title: "File Uploaded Successfully",
        description: `Found ${data.length} employee records with ${fields.length} fields.`,
      });
      
    } catch (error) {
      toast({
        title: "Error Processing File",
        description: error instanceof Error ? error.message : "Failed to process the file.",
        variant: "destructive",
      });
    }
  };
  
  const handleFieldMappingChange = (originalField: string, mappedField: string) => {
    setMappedFields({
      ...mappedFields,
      [originalField]: mappedField,
    });
  };
  
  const handleAddManualField = (field: {name: string, type: string}) => {
    setManualFields([...manualFields, field]);
  };
  
  const handleRemoveManualField = (index: number) => {
    const updatedFields = [...manualFields];
    updatedFields.splice(index, 1);
    setManualFields(updatedFields);
  };
  
  const handleMappingMethodChange = (method: 'manual' | 'auto') => {
    setMappingMethod(method);
  };
  
  const handleMappingComplete = () => {
    // Simple validation
    const errors: Record<string, string[]> = {};
    
    parsedData.forEach((row, index) => {
      Object.entries(mappedFields).forEach(([originalField, mappedField]) => {
        if (mappedField && !row[originalField]) {
          if (!errors[mappedField]) {
            errors[mappedField] = [];
          }
          errors[mappedField].push(`Missing value in row ${index + 1}`);
        }
      });
    });
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setCurrentStep('preview');
    } else {
      toast({
        title: "Validation Issues Detected",
        description: "Please review the validation errors before proceeding.",
        variant: "destructive",
      });
    }
  };
  
  const handleConfirmImport = () => {
    // In a real app, this would send the mapped data to the server
    // For now, simulate a successful import with some failures
    const results = {
      total: parsedData.length,
      successful: parsedData.length - Math.floor(parsedData.length * 0.1),
      failed: Math.floor(parsedData.length * 0.1),
      errors: Array.from({length: Math.floor(parsedData.length * 0.1)}, (_, i) => ({
        row: Math.floor(Math.random() * parsedData.length) + 1,
        error: "Validation failed for required field"
      }))
    };
    
    setImportResults(results);
    setCurrentStep('summary');
    
    toast({
      title: "Import Completed",
      description: `Successfully imported ${results.successful} of ${results.total} employees.`,
      variant: results.failed > 0 ? "destructive" : "default",
    });
  };
  
  const handleStartOver = () => {
    setCurrentStep('upload');
    setFileType(null);
    setUploadedFile(null);
    setParsedData([]);
    setDetectedFields([]);
    setMappedFields({});
    setMappingMethod('auto');
    setManualFields([]);
    setValidationErrors({});
    setImportResults(null);
  };

  return {
    currentStep,
    fileType,
    uploadedFile,
    parsedData,
    detectedFields,
    mappedFields,
    mappingMethod,
    manualFields,
    validationErrors,
    importResults,
    handleFileUpload,
    handleFieldMappingChange,
    handleAddManualField,
    handleRemoveManualField,
    handleMappingMethodChange,
    handleMappingComplete,
    handleConfirmImport,
    handleStartOver,
    setCurrentStep
  };
};
