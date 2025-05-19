
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type Subgoal } from '@/components/goals/employee-form/types';

interface SubgoalConfigPanelProps {
  subgoal: Subgoal;
  onUpdate: (id: string, field: string, value: any) => void;
}

export const SubgoalConfigPanel: React.FC<SubgoalConfigPanelProps> = ({ 
  subgoal, 
  onUpdate 
}) => {
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
              onChange={(e) => onUpdate(subgoal.id, 'config.min', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor={`${subgoal.id}-max`}>Maximum Value</Label>
            <Input
              id={`${subgoal.id}-max`}
              type="number"
              value={subgoal.config.max}
              onChange={(e) => onUpdate(subgoal.id, 'config.max', parseFloat(e.target.value))}
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
              onChange={(e) => onUpdate(subgoal.id, 'config.trueScore', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor={`${subgoal.id}-false-score`}>Score if False</Label>
            <Input
              id={`${subgoal.id}-false-score`}
              type="number"
              value={subgoal.config.falseScore || 1}
              onChange={(e) => onUpdate(subgoal.id, 'config.falseScore', parseFloat(e.target.value))}
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
            onChange={(e) => onUpdate(subgoal.id, 'config.expression', e.target.value)}
            placeholder="Enter JavaScript expression that evaluates to a score 1-5"
            rows={3}
          />
        </div>
      );
      
    default:
      return null;
  }
};
