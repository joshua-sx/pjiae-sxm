
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Upload, Link } from 'lucide-react';
import { ImportSource } from '@/hooks/useEmployeeImport';
import { cn } from '@/lib/utils';

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
      icon: <Upload className="h-12 w-12 text-primary" />
    },
    {
      id: 'api',
      title: 'Import from API',
      description: 'Connect to an external API to import employees',
      icon: <Link className="h-12 w-12 text-primary" />
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sourceOptions.map((option) => (
        <Card 
          key={option.id}
          className="cursor-pointer hover:shadow-md transition-all duration-300 border-2 hover:border-primary overflow-hidden"
          onClick={() => onSourceSelect(option.id)}
        >
          <CardHeader className="pb-2 bg-neutral-50 border-b">
            <CardTitle className="flex items-center gap-2 text-primary">
              {option.title}
            </CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              {option.icon}
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {option.id === 'file' ? 
                'Supported formats: CSV, JSON, XML' : 
                'Connect to your HR system API'
              }
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
