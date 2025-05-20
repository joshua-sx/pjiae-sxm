
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FieldMappingTable } from '@/components/imports/FieldMappingTable';
import { ArrowLeft } from 'lucide-react';

interface MappingStepProps {
  detectedFields: string[];
  mappedFields: Record<string, string>;
  onMappingChange: (originalField: string, mappedField: string) => void;
  onMappingMethodChange: (method: 'manual' | 'auto') => void;
  validationErrors: Record<string, string[]>;
  sampleData: any[];
  onBack: () => void;
  onContinue: () => void;
}

export const MappingStep = ({
  detectedFields,
  mappedFields,
  onMappingChange,
  onMappingMethodChange,
  validationErrors,
  sampleData,
  onBack,
  onContinue
}: MappingStepProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Map Employee Fields</CardTitle>
        <CardDescription>
          Match your file's fields to the system's employee fields
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="auto" onValueChange={(v) => onMappingMethodChange(v as 'auto' | 'manual')}>
          <TabsList className="mb-4">
            <TabsTrigger value="auto">Automatic Field Detection</TabsTrigger>
            <TabsTrigger value="manual">Manual Field Creation</TabsTrigger>
          </TabsList>
          <TabsContent value="auto">
            <FieldMappingTable 
              detectedFields={detectedFields}
              mappedFields={mappedFields}
              onMappingChange={onMappingChange}
              validationErrors={validationErrors}
              sampleData={sampleData.slice(0, 2)}
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
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onContinue}>
            Preview Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
