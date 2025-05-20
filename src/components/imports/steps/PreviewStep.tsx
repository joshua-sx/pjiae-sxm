
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataPreview } from '@/components/imports/DataPreview';
import { ArrowLeft, UploadCloud } from 'lucide-react';

interface PreviewStepProps {
  data: any[];
  mappedFields: Record<string, string>;
  onBack: () => void;
  onConfirm: () => void;
}

export const PreviewStep = ({ data, mappedFields, onBack, onConfirm }: PreviewStepProps) => {
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
          data={data.slice(0, 10)} 
          mappedFields={mappedFields}
        />
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Summary</h3>
          <p>Total records: <span className="font-medium">{data.length}</span></p>
          <p>Fields to import: <span className="font-medium">{Object.values(mappedFields).filter(Boolean).length}</span></p>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mapping
          </Button>
          <Button onClick={onConfirm}>
            <UploadCloud className="mr-2 h-4 w-4" />
            Confirm Import
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
