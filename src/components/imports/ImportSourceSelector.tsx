
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Link } from 'lucide-react';
import { ImportSource } from '@/hooks/useEmployeeImport';

interface ImportSourceOption {
  id: ImportSource;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ImportSourceSelectorProps {
  onSourceSelect: (source: ImportSource) => void;
}

export const ImportSourceSelector = ({ onSourceSelect }: ImportSourceSelectorProps) => {
  const sourceOptions: ImportSourceOption[] = [
    {
      id: 'file',
      title: 'Import from File',
      description: 'Upload employees from CSV, JSON, or XML files',
      icon: <Upload className="h-10 w-10 text-pjiae-blue" />
    },
    {
      id: 'api',
      title: 'Import from API',
      description: 'Connect to an external API to import employees',
      icon: <Link className="h-10 w-10 text-pjiae-blue" />
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sourceOptions.map((option) => (
        <Card 
          key={option.id}
          className="cursor-pointer hover:border-pjiae-blue transition-all"
          onClick={() => onSourceSelect(option.id)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              {option.title}
            </CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            {option.icon}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
