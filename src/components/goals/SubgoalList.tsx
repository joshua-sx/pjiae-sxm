
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { type Subgoal } from '@/components/goals/employee-form/types';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface SubgoalListProps {
  subgoals: Subgoal[];
  onChange: (subgoals: Subgoal[]) => void;
}

export const SubgoalList: React.FC<SubgoalListProps> = ({ subgoals, onChange }) => {
  // Generate unique ID for a new subgoal
  const generateId = () => `subgoal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Add a new subgoal
  const handleAddSubgoal = () => {
    const newSubgoal: Subgoal = {
      id: generateId(),
      name: `Measurement ${subgoals.length + 1}`,
      type: 'number',
      unit: '',
      weight: 1,
      config: {
        min: 1,
        max: 5
      }
    };
    
    onChange([...subgoals, newSubgoal]);
    console.log('Subgoal added:', newSubgoal);
  };
  
  // Update a subgoal
  const handleUpdateSubgoal = (id: string, field: string, value: any) => {
    const updatedSubgoals = subgoals.map(subgoal => {
      if (subgoal.id === id) {
        if (field.includes('.')) {
          // Handle nested fields like 'config.min'
          const [parent, child] = field.split('.');
          return {
            ...subgoal,
            [parent]: {
              ...subgoal[parent as keyof typeof subgoal],
              [child]: value
            }
          };
        }
        return { ...subgoal, [field]: value };
      }
      return subgoal;
    });
    
    onChange(updatedSubgoals);
    console.log(`Subgoal ${id} updated:`, { field, value });
  };
  
  // Remove a subgoal
  const handleRemoveSubgoal = (id: string) => {
    const updatedSubgoals = subgoals.filter(subgoal => subgoal.id !== id);
    onChange(updatedSubgoals);
    console.log('Subgoal removed:', id);
  };
  
  // Reorder subgoals (simplified version without drag-and-drop)
  const moveSubgoal = (fromIndex: number, toIndex: number) => {
    const updatedSubgoals = [...subgoals];
    const [movedSubgoal] = updatedSubgoals.splice(fromIndex, 1);
    updatedSubgoals.splice(toIndex, 0, movedSubgoal);
    onChange(updatedSubgoals);
    console.log(`Subgoal moved from index ${fromIndex} to ${toIndex}`);
  };
  
  // Render the configuration panel based on subgoal type
  const renderConfigPanel = (subgoal: Subgoal) => {
    switch (subgoal.type) {
      case 'number':
      case 'currency':
      case 'percentage':
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor={`${subgoal.id}-min`}>Minimum Value</Label>
              <Input
                id={`${subgoal.id}-min`}
                type="number"
                value={subgoal.config.min}
                onChange={(e) => handleUpdateSubgoal(subgoal.id, 'config.min', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor={`${subgoal.id}-max`}>Maximum Value</Label>
              <Input
                id={`${subgoal.id}-max`}
                type="number"
                value={subgoal.config.max}
                onChange={(e) => handleUpdateSubgoal(subgoal.id, 'config.max', parseFloat(e.target.value))}
              />
            </div>
          </div>
        );
        
      case 'binary':
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor={`${subgoal.id}-true-score`}>Score if True</Label>
              <Input
                id={`${subgoal.id}-true-score`}
                type="number"
                value={subgoal.config.trueScore || 5}
                onChange={(e) => handleUpdateSubgoal(subgoal.id, 'config.trueScore', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor={`${subgoal.id}-false-score`}>Score if False</Label>
              <Input
                id={`${subgoal.id}-false-score`}
                type="number"
                value={subgoal.config.falseScore || 1}
                onChange={(e) => handleUpdateSubgoal(subgoal.id, 'config.falseScore', parseFloat(e.target.value))}
              />
            </div>
          </div>
        );
        
      case 'custom':
        return (
          <div className="mt-4">
            <Label htmlFor={`${subgoal.id}-expression`}>Custom Evaluation Expression</Label>
            <Textarea
              id={`${subgoal.id}-expression`}
              value={subgoal.config.expression || ''}
              onChange={(e) => handleUpdateSubgoal(subgoal.id, 'config.expression', e.target.value)}
              placeholder="Enter JavaScript expression that evaluates to a score 1-5"
              rows={3}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {subgoals.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md border border-dashed border-gray-300">
          <p className="text-muted-foreground mb-4">No subgoals or measurements defined yet</p>
          <Button onClick={handleAddSubgoal} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add First Measurement
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {subgoals.map((subgoal, index) => (
            <Card key={subgoal.id} className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="cursor-move hover:bg-gray-100 p-2 rounded-md">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    value={subgoal.name}
                    onChange={(e) => handleUpdateSubgoal(subgoal.id, 'name', e.target.value)}
                    className="font-medium"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveSubgoal(subgoal.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`${subgoal.id}-type`}>Measurement Type</Label>
                    <Select 
                      value={subgoal.type}
                      onValueChange={(value) => handleUpdateSubgoal(subgoal.id, 'type', value)}
                    >
                      <SelectTrigger id={`${subgoal.id}-type`}>
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
                    <Label htmlFor={`${subgoal.id}-unit`}>Unit</Label>
                    <Input
                      id={`${subgoal.id}-unit`}
                      value={subgoal.unit}
                      onChange={(e) => handleUpdateSubgoal(subgoal.id, 'unit', e.target.value)}
                      placeholder="e.g., %, $, days, etc."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`${subgoal.id}-weight`}>Weight</Label>
                    <Input
                      id={`${subgoal.id}-weight`}
                      type="number"
                      value={subgoal.weight}
                      onChange={(e) => handleUpdateSubgoal(subgoal.id, 'weight', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                
                {renderConfigPanel(subgoal)}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {subgoals.length > 0 && (
        <Button onClick={handleAddSubgoal} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Another Measurement
        </Button>
      )}
    </div>
  );
};
