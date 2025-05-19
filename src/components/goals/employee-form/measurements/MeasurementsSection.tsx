
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { type Subgoal } from '../types';
import { cn } from '@/lib/utils';
import { MeasurementDrawer } from './MeasurementDrawer';
import { MeasurementsList } from './MeasurementsList';
import { useSubgoalManager } from '@/hooks/useSubgoalManager';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSubgoal, setEditingSubgoal] = useState<Subgoal | null>(null);
  
  const { handleRemoveSubgoal, moveSubgoal } = useSubgoalManager(subgoals, onSubgoalsChange);

  // Calculate total weight
  const totalWeight = subgoals.reduce((sum, subgoal) => sum + subgoal.weight, 0);
  const remainingWeight = 100 - totalWeight;
  const isWeightValid = totalWeight <= 100;

  const openDrawerForNewMeasurement = () => {
    setEditingSubgoal(null);
    setIsDrawerOpen(true);
  };

  const openDrawerForEditMeasurement = (subgoal: Subgoal) => {
    setEditingSubgoal(subgoal);
    setIsDrawerOpen(true);
  };

  return (
    <div className="px-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Measurements</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={openDrawerForNewMeasurement}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Measurement
        </Button>
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
      
      <MeasurementsList 
        subgoals={subgoals} 
        onEditSubgoal={openDrawerForEditMeasurement}
        onRemoveSubgoal={handleRemoveSubgoal}
        onMoveSubgoal={moveSubgoal}
      />

      {/* Measurement drawer */}
      <MeasurementDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        subgoal={editingSubgoal}
        onAddSubgoal={onAddSubgoal}
        onUpdateSubgoals={onSubgoalsChange}
        existingSubgoals={subgoals}
        remainingWeight={remainingWeight}
      />
    </div>
  );
};
