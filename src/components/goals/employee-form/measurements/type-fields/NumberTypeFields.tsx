
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NumberTypeFieldsProps {
  minValue: string;
  setMinValue: (value: string) => void;
  maxValue: string;
  setMaxValue: (value: string) => void;
  measurementUnit: string;
  setMeasurementUnit: (value: string) => void;
}

export const NumberTypeFields: React.FC<NumberTypeFieldsProps> = ({
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  measurementUnit,
  setMeasurementUnit,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 border-t pt-4">
      <div>
        <Label htmlFor="min-value">Minimum Value</Label>
        <Input
          id="min-value"
          type="number"
          value={minValue}
          onChange={(e) => setMinValue(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="max-value">Maximum Value</Label>
        <Input
          id="max-value"
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="measurement-unit">Unit (optional)</Label>
        <Input
          id="measurement-unit"
          placeholder="e.g., points, items"
          value={measurementUnit}
          onChange={(e) => setMeasurementUnit(e.target.value)}
        />
      </div>
    </div>
  );
};
