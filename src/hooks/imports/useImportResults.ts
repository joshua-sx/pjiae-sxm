
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ImportResults {
  total: number;
  successful: number;
  failed: number;
  errors: Array<{row: number, error: string}>;
}

export interface ImportResultsHook {
  importResults: ImportResults | null;
  processImport: (data: any[], mappedFields: Record<string, string>) => void;
  resetResults: () => void;
}

export const useImportResults = (): ImportResultsHook => {
  const { toast } = useToast();
  const [importResults, setImportResults] = useState<ImportResults | null>(null);
  
  const processImport = (data: any[], mappedFields: Record<string, string>) => {
    // In a real app, this would send the mapped data to the server
    // For now, simulate a successful import with some failures
    const results = {
      total: data.length,
      successful: data.length - Math.floor(data.length * 0.1),
      failed: Math.floor(data.length * 0.1),
      errors: Array.from({length: Math.floor(data.length * 0.1)}, (_, i) => ({
        row: Math.floor(Math.random() * data.length) + 1,
        error: "Validation failed for required field"
      }))
    };
    
    setImportResults(results);
    
    toast({
      title: "Import Completed",
      description: `Successfully imported ${results.successful} of ${results.total} employees.`,
      variant: results.failed > 0 ? "destructive" : "default",
    });
  };
  
  const resetResults = () => {
    setImportResults(null);
  };
  
  return {
    importResults,
    processImport,
    resetResults
  };
};
