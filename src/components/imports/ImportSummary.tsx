
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

interface ImportSummaryProps {
  results: {
    total: number;
    successful: number;
    failed: number;
    errors: Array<{row: number, error: string}>;
  }
}

export const ImportSummary = ({ results }: ImportSummaryProps) => {
  const successPercentage = (results.successful / results.total) * 100;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-pjiae-blue">{results.total}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Employees</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-green-500 flex items-center">
                {results.successful}
                <CheckCircle className="ml-2 h-6 w-6" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">Successfully Imported</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-amber-500 flex items-center">
                {results.failed}
                <AlertCircle className="ml-2 h-6 w-6" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">Failed to Import</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-500 h-2.5 rounded-full" 
          style={{ width: `${successPercentage}%` }}
        ></div>
      </div>
      
      {results.failed > 0 && (
        <div className="mt-6 border border-amber-200 bg-amber-50 rounded-md p-4">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="font-medium">Error Summary</h3>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {results.errors.map((error, index) => (
              <div key={index} className="text-sm p-2 bg-white rounded border border-amber-100">
                <span className="font-medium">Row {error.row}:</span> {error.error}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
