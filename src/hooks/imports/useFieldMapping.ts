
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ValidationError {
  field: string;
  errors: string[];
}

export interface FieldMappingHook {
  mappedFields: Record<string, string>;
  mappingMethod: 'manual' | 'auto';
  manualFields: Array<{name: string, type: string}>;
  validationErrors: Record<string, string[]>;
  handleFieldMappingChange: (originalField: string, mappedField: string) => void;
  handleAddManualField: (field: {name: string, type: string}) => void;
  handleRemoveManualField: (index: number) => void;
  handleMappingMethodChange: (method: 'manual' | 'auto') => void;
  validateMappings: (data: any[]) => boolean;
  setInitialMappings: (fields: string[]) => void;
}

export const useFieldMapping = (): FieldMappingHook => {
  const { toast } = useToast();
  const [mappedFields, setMappedFields] = useState<Record<string, string>>({});
  const [mappingMethod, setMappingMethod] = useState<'manual' | 'auto'>('auto');
  const [manualFields, setManualFields] = useState<Array<{name: string, type: string}>>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  
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
  
  const validateMappings = (data: any[]): boolean => {
    // Simple validation
    const errors: Record<string, string[]> = {};
    
    data.forEach((row, index) => {
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
    
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Validation Issues Detected",
        description: "Please review the validation errors before proceeding.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const setInitialMappings = (fields: string[]) => {
    const initialMappings: Record<string, string> = {};
    fields.forEach(field => {
      initialMappings[field] = field;
    });
    setMappedFields(initialMappings);
  };
  
  return {
    mappedFields,
    mappingMethod,
    manualFields,
    validationErrors,
    handleFieldMappingChange,
    handleAddManualField,
    handleRemoveManualField,
    handleMappingMethodChange,
    validateMappings,
    setInitialMappings
  };
};
