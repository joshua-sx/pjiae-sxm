
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/imports/FileUploader';
import { FieldMappingTable } from '@/components/imports/FieldMappingTable';
import { DataPreview } from '@/components/imports/DataPreview';
import { ImportSummary } from '@/components/imports/ImportSummary';
import { useToast } from '@/hooks/use-toast';
import { parseCsv, parseJson, parseXml } from '@/utils/fileParser';
import { ArrowLeft, FileSpreadsheet, UploadCloud } from 'lucide-react';

type ImportStep = 'upload' | 'mapping' | 'preview' | 'summary';

const EmployeeImport = () => {
  const navigate = useNavigate();
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
  const [importResults, setImportResults] = useState<{
    total: number;
    successful: number;
    failed: number;
    errors: Array<{row: number, error: string}>;
  } | null>(null);
  
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
      variant: results.failed > 0 ? "warning" : "success",
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
  
  const renderStepContent = () => {
    switch(currentStep) {
      case 'upload':
        return (
          <div className="max-w-2xl mx-auto mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Import Employee Data</CardTitle>
                <CardDescription className="text-center">
                  Upload a file containing employee records to import
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader onFileUpload={handleFileUpload} />
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-medium">Accepted File Formats:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <FileSpreadsheet className="w-12 h-12 mx-auto text-blue-500" />
                        <h4 className="font-medium mt-2">CSV</h4>
                        <p className="text-sm text-muted-foreground">Comma Separated Values</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <FileSpreadsheet className="w-12 h-12 mx-auto text-green-500" />
                        <h4 className="font-medium mt-2">JSON</h4>
                        <p className="text-sm text-muted-foreground">JavaScript Object Notation</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <FileSpreadsheet className="w-12 h-12 mx-auto text-orange-500" />
                        <h4 className="font-medium mt-2">XML</h4>
                        <p className="text-sm text-muted-foreground">Extensible Markup Language</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'mapping':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Map Employee Fields</CardTitle>
              <CardDescription>
                Match your file's fields to the system's employee fields
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="auto" onValueChange={(v) => handleMappingMethodChange(v as 'auto' | 'manual')}>
                <TabsList className="mb-4">
                  <TabsTrigger value="auto">Automatic Field Detection</TabsTrigger>
                  <TabsTrigger value="manual">Manual Field Creation</TabsTrigger>
                </TabsList>
                <TabsContent value="auto">
                  <FieldMappingTable 
                    detectedFields={detectedFields}
                    mappedFields={mappedFields}
                    onMappingChange={handleFieldMappingChange}
                    validationErrors={validationErrors}
                    sampleData={parsedData.slice(0, 2)}
                  />
                </TabsContent>
                <TabsContent value="manual">
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Create Custom Fields</h3>
                    <p className="text-muted-foreground mb-4">
                      Define custom fields and map them to the columns in your file
                    </p>
                    {/* Manual field creation form would go here */}
                    <div className="py-8 text-center bg-muted rounded-md">
                      <p className="text-muted-foreground">
                        Manual field creation interface will be implemented here
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handleStartOver}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleMappingComplete}>
                  Preview Data
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'preview':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Preview Import Data</CardTitle>
              <CardDescription>
                Review how your data will be imported into the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataPreview 
                data={parsedData.slice(0, 10)} 
                mappedFields={mappedFields}
              />
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">Summary</h3>
                <p>Total records: <span className="font-medium">{parsedData.length}</span></p>
                <p>Fields to import: <span className="font-medium">{Object.values(mappedFields).filter(Boolean).length}</span></p>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('mapping')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Mapping
                </Button>
                <Button onClick={handleConfirmImport}>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Confirm Import
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'summary':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Import Complete</CardTitle>
              <CardDescription>
                Summary of your employee data import
              </CardDescription>
            </CardHeader>
            <CardContent>
              {importResults && (
                <ImportSummary results={importResults} />
              )}
              
              <div className="mt-8 flex justify-end space-x-4">
                <Button variant="outline" onClick={handleStartOver}>
                  Start New Import
                </Button>
                <Button onClick={() => navigate('/employees')}>
                  View Employees
                </Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Import Employees"
          subtitle="Bulk import employee records from external files"
          actions={
            currentStep !== 'upload' && (
              <Button variant="outline" onClick={handleStartOver}>
                Cancel
              </Button>
            )
          }
        />
        
        {/* Step indicators */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className={`flex flex-col items-center ${currentStep === 'upload' ? 'text-pjiae-blue' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'upload' ? 'bg-pjiae-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="text-xs mt-1">Upload</span>
            </div>
            <div className={`w-12 h-1 ${currentStep !== 'upload' ? 'bg-pjiae-blue' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${currentStep === 'mapping' ? 'text-pjiae-blue' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'mapping' ? 'bg-pjiae-blue text-white' : (currentStep === 'upload' ? 'bg-gray-200' : 'bg-pjiae-blue text-white')}`}>
                2
              </div>
              <span className="text-xs mt-1">Map Fields</span>
            </div>
            <div className={`w-12 h-1 ${currentStep === 'preview' || currentStep === 'summary' ? 'bg-pjiae-blue' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${currentStep === 'preview' ? 'text-pjiae-blue' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'preview' ? 'bg-pjiae-blue text-white' : (currentStep === 'summary' ? 'bg-pjiae-blue text-white' : 'bg-gray-200')}`}>
                3
              </div>
              <span className="text-xs mt-1">Preview</span>
            </div>
            <div className={`w-12 h-1 ${currentStep === 'summary' ? 'bg-pjiae-blue' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${currentStep === 'summary' ? 'text-pjiae-blue' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'summary' ? 'bg-pjiae-blue text-white' : 'bg-gray-200'}`}>
                4
              </div>
              <span className="text-xs mt-1">Complete</span>
            </div>
          </div>
        </div>
        
        {renderStepContent()}
      </div>
    </MainLayout>
  );
};

export default EmployeeImport;
