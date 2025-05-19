
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { type Subgoal } from '../types';
import { cn } from '@/lib/utils';
import { MeasurementsList } from './MeasurementsList';
import { useSubgoalManager } from '@/hooks/useSubgoalManager';
import { InlineMeasurementForm } from './InlineMeasurementForm';

interface MeasurementsSectionProps {
  subgoals: Subgoal[];
  onAddSubgoal: (subgoal: Subgoal) => void;
  onSubgoalsChange: (subgoals: Subgoal[]) => void;
}

export const MeasurementsSection: React.FC<MeasurementsSectionProps> = ({ 
  subgoals,
  onAddSubgoal,
  onSubgoalsChange
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingSubgoal, setEditingSubgoal] = useState<Subgoal | null>(null);
  
  const { handleRemoveSubgoal, moveSubgoal } = useSubgoalManager(subgoals, onSubgoalsChange);

  // Calculate total weight
  const totalWeight = subgoals.reduce((sum, subgoal) => sum + subgoal.weight, 0);
  const remainingWeight = 100 - totalWeight;
  const isWeightValid = totalWeight <= 100;

  const openFormForNewMeasurement = () => {
    setEditingSubgoal(null);
    setIsFormVisible(true);
  };

  const openFormForEditMeasurement = (subgoal: Subgoal) => {
    setEditingSubgoal(subgoal);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingSubgoal(null);
  };

  return (
    <div className="px-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Measurements</h3>
        {!isFormVisible && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openFormForNewMeasurement}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Measurement
          </Button>
        )}
      </div>
      
      {/* Weight progress indicator */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Total Weight</span>
          <span className={cn(
            totalWeight === 100 ? "text-green-600 font-medium" : 
            totalWeight > 100 ? "text-red-600 font-medium" : ""
          )}>
            {totalWeight}% of 100%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div 
            className={cn(
              "h-2.5 rounded-full", 
              totalWeight === 100 ? "bg-green-500" : 
              totalWeight > 100 ? "bg-red-500" : "bg-blue-500"
            )}
            style={{ width: `${Math.min(totalWeight, 100)}%` }}
          ></div>
        </div>
        {!isWeightValid && (
          <p className="text-sm text-red-500 mt-1">
            Total weight exceeds 100%. Please adjust measurement weights.
          </p>
        )}
      </div>
      
      {/* Inline measurement form */}
      {isFormVisible && (
        <InlineMeasurementForm
          subgoal={editingSubgoal}
          onAddSubgoal={onAddSubgoal}
          onUpdateSubgoals={onSubgoalsChange}
          existingSubgoals={subgoals}
          remainingWeight={remainingWeight}
          onCancel={handleCancelForm}
        />
      )}
      
      <MeasurementsList 
        subgoals={subgoals} 
        onEditSubgoal={openFormForEditMeasurement}
        onRemoveSubgoal={handleRemoveSubgoal}
        onMoveSubgoal={moveSubgoal}
      />
    </div>
  );
};
