
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { type Subgoal } from '@/pages/manager/EmployeeGoalForm';
import { Card, CardContent } from '@/components/ui/card';

interface FormulaEditorProps {
  value: string;
  onChange: (value: string) => void;
  subgoals: Subgoal[];
}

export const FormulaEditor: React.FC<FormulaEditorProps> = ({
  value,
  onChange,
  subgoals,
}) => {
  // Generate reference text for available measurements
  const getMeasurementReferenceText = () => {
    if (subgoals.length === 0) {
      return 'Add measurements first to reference them in your formula';
    }
    
    return subgoals.map((subgoal, index) => {
      return `M${index + 1}: ${subgoal.name}`;
    }).join('\n');
  };
  
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g., (M1*0.4 + M2*0.6)"
            rows={6}
            className="font-mono text-sm"
          />
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-4">
              <h4 className="text-sm font-medium mb-2">Available Measurements</h4>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                {getMeasurementReferenceText()}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <h4 className="text-sm font-medium mb-2">Formula Examples</h4>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                {`// Simple weighted average
(M1*0.3 + M2*0.7)

// Min-max clamp to range 1-5
Math.min(5, Math.max(1, (M1 + M2) / 2))

// Conditional logic
M1 > 3 ? 5 : (M1 > 2 ? 4 : 3)`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
