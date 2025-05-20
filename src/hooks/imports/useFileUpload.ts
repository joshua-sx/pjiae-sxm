
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { parseCsv, parseJson, parseXml } from '@/utils/fileParser';

export type FileType = 'json' | 'xml' | 'csv' | null;

export interface FileUploadHook {
  fileType: FileType;
  uploadedFile: File | null;
  parsedData: any[];
  detectedFields: string[];
  handleFileUpload: (file: File) => Promise<void>;
}

export const useFileUpload = (): FileUploadHook => {
  const { toast } = useToast();
  const [fileType, setFileType] = useState<FileType>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [detectedFields, setDetectedFields] = useState<string[]>([]);
  
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
      
      toast({
        title: "File Uploaded Successfully",
        description: `Found ${data.length} employee records with ${fields.length} fields.`,
      });
      
      return data;
    } catch (error) {
      toast({
        title: "Error Processing File",
        description: error instanceof Error ? error.message : "Failed to process the file.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return {
    fileType,
    uploadedFile,
    parsedData,
    detectedFields,
    handleFileUpload
  };
};
