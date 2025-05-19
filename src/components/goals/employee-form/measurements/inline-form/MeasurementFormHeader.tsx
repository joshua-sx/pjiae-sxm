
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface MeasurementFormHeaderProps {
  title: string;
  onCancel: () => void;
}

export const MeasurementFormHeader: React.FC<MeasurementFormHeaderProps> = ({ 
  title, 
  onCancel 
}) => {
  return (
    <div className="flex justify-between items-center">
      <CardTitle className="text-lg">
        {title}
      </CardTitle>
      <Button variant="ghost" size="icon" onClick={onCancel}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
