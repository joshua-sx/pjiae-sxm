
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Subgoal } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SubgoalCreationSectionProps {
  onAddSubgoal: (subgoal: Subgoal) => void;
}

export const SubgoalCreationSection: React.FC<SubgoalCreationSectionProps> = ({ onAddSubgoal }) => {
  const [subgoalName, setSubgoalName] = useState('');
  const [subgoalType, setSubgoalType] = useState<Subgoal['type']>('number');
  const [unit, setUnit] = useState('');
  
  const handleCreateSubgoal = () => {
    if (!subgoalName.trim()) return;
    
    const newSubgoal: Subgoal = {
      id: `subgoal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: subgoalName,
      type: subgoalType,
      unit: unit,
      weight: 1,
      config: {
        min: 1,
        max: 5
      }
    };
    
    // Add the subgoal
    onAddSubgoal(newSubgoal);
    
    // Reset the form
    setSubgoalName('');
    setUnit('');
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Create New Measurement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="subgoal-name">Measurement Name</Label>
            <Input 
              id="subgoal-name" 
              placeholder="e.g., Customer Satisfaction Score"
              value={subgoalName}
              onChange={(e) => setSubgoalName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subgoal-type">Type</Label>
              <Select value={subgoalType} onValueChange={(value) => setSubgoalType(value as Subgoal['type'])}>
                <SelectTrigger id="subgoal-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="currency">Currency</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="binary">Binary (Yes/No)</SelectItem>
                  <SelectItem value="custom">Custom Expression</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="subgoal-unit">Unit</Label>
              <Input
                id="subgoal-unit"
                placeholder="e.g., %, $, points"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleCreateSubgoal} 
            className="w-full" 
            disabled={!subgoalName.trim()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Measurement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
