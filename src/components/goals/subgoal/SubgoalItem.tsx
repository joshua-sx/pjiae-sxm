
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, GripVertical } from 'lucide-react';
import { type Subgoal } from '@/components/goals/employee-form/types';
import { Card, CardContent } from '@/components/ui/card';
import { SubgoalConfigPanel } from './SubgoalConfigPanel';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SubgoalItemProps {
  subgoal: Subgoal;
  onUpdate: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
}

export const SubgoalItem: React.FC<SubgoalItemProps> = ({ 
  subgoal, 
  onUpdate, 
  onRemove 
}) => {
  // Set up sortable functionality
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: subgoal.id });

  // Apply styles from dnd-kit
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card className="relative" ref={setNodeRef} style={style}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="cursor-move hover:bg-gray-100 p-2 rounded-md"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            value={subgoal.name}
            onChange={(e) => onUpdate(subgoal.id, 'name', e.target.value)}
            className="font-medium"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(subgoal.id)}
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
              onValueChange={(value) => onUpdate(subgoal.id, 'type', value)}
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
              onChange={(e) => onUpdate(subgoal.id, 'unit', e.target.value)}
              placeholder="e.g., %, $, days, etc."
            />
          </div>
          
          <div>
            <Label htmlFor={`${subgoal.id}-weight`}>Weight</Label>
            <Input
              id={`${subgoal.id}-weight`}
              type="number"
              value={subgoal.weight}
              onChange={(e) => onUpdate(subgoal.id, 'weight', parseFloat(e.target.value))}
            />
          </div>
        </div>
        
        <SubgoalConfigPanel subgoal={subgoal} onUpdate={onUpdate} />
      </CardContent>
    </Card>
  );
};
