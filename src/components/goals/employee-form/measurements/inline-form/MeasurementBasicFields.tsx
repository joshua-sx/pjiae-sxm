
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Subgoal } from '../../types';
import { Hash, DollarSign, Percent, ToggleRight, Calendar as CalendarIcon } from 'lucide-react';

interface MeasurementBasicFieldsProps {
  measurementName: string;
  setMeasurementName: (value: string) => void;
  measurementType: Subgoal['type'];
  setMeasurementType: (value: Subgoal['type']) => void;
  measurementWeight: string;
  setMeasurementWeight: (value: string) => void;
}

export const MeasurementBasicFields: React.FC<MeasurementBasicFieldsProps> = ({
  measurementName,
  setMeasurementName,
  measurementType,
  setMeasurementType,
  measurementWeight,
  setMeasurementWeight,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="measurement-name">Measurement Name</Label>
        <Input 
          id="measurement-name" 
          placeholder="e.g., Customer Satisfaction Score"
          value={measurementName}
          onChange={(e) => setMeasurementName(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="measurement-type">Measurement Type</Label>
        <Select 
          value={measurementType} 
          onValueChange={(value) => setMeasurementType(value as Subgoal['type'])}
        >
          <SelectTrigger id="measurement-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="number" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-slate-500" />
                <span>Number</span>
              </div>
            </SelectItem>
            <SelectItem value="currency" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-amber-500" />
                <span>Currency</span>
              </div>
            </SelectItem>
            <SelectItem value="percentage" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-purple-500" />
                <span>Percentage</span>
              </div>
            </SelectItem>
            <SelectItem value="binary" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <ToggleRight className="h-4 w-4 text-green-500" />
                <span>Binary (Pass/Fail)</span>
              </div>
            </SelectItem>
            <SelectItem value="date" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-blue-500" />
                <span>Date</span>
              </div>
            </SelectItem>
            <SelectItem value="custom" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-slate-500" />
                <span>Custom Formula</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-1">
          Select the type of measurement that best fits your goal
        </p>
      </div>
      
      <div>
        <Label htmlFor="measurement-weight">Weight (%)</Label>
        <Input
          id="measurement-weight"
          type="number"
          min="1"
          max="100"
          value={measurementWeight}
          onChange={(e) => setMeasurementWeight(e.target.value)}
        />
        <p className="text-sm text-muted-foreground mt-1">
          The weight of this measurement in the overall goal (all weights must sum to 100%)
        </p>
      </div>
    </div>
  );
};
