
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImportSummary } from '@/components/imports/ImportSummary';
import { ImportResults } from '@/hooks/useEmployeeImport';

interface SummaryStepProps {
  results: ImportResults;
  onStartOver: () => void;
}

export const SummaryStep = ({ results, onStartOver }: SummaryStepProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Complete</CardTitle>
        <CardDescription>
          Summary of your employee data import
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImportSummary results={results} />
        
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={onStartOver}>
            Start New Import
          </Button>
          <Button onClick={() => navigate('/employees')}>
            View Employees
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
