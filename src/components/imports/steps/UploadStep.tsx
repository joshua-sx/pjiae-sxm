
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUploader } from '@/components/imports/FileUploader';
import { FileSpreadsheet } from 'lucide-react';

interface UploadStepProps {
  onFileUpload: (file: File) => Promise<void>;
}

export const UploadStep = ({ onFileUpload }: UploadStepProps) => {
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
          <FileUploader onFileUpload={onFileUpload} />
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
};
