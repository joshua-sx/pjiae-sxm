
import { useState, useCallback } from 'react';
import { type Subgoal } from '@/components/goals/employee-form/types';

export const useSubgoalManager = (
  subgoals: Subgoal[],
  onChange: (subgoals: Subgoal[]) => void
) => {
  // Generate unique ID for a new subgoal
  const generateId = useCallback(() => 
    `subgoal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
    []
  );
  
  // Add a new subgoal
  const handleAddSubgoal = useCallback(() => {
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
    console.log('Measurement added:', newSubgoal);
  }, [subgoals, onChange, generateId]);
  
  // Update a subgoal
  const handleUpdateSubgoal = useCallback((id: string, field: string, value: any) => {
    const updatedSubgoals = subgoals.map(subgoal => {
      if (subgoal.id === id) {
        if (field.includes('.')) {
          // Handle nested fields like 'config.min'
          const [parent, child] = field.split('.');
          return {
            ...subgoal,
            [parent]: {
              ...subgoal[parent as keyof Subgoal] as object,
              [child]: value
            }
          };
        }
        return { ...subgoal, [field]: value };
      }
      return subgoal;
    });
    
    onChange(updatedSubgoals);
    console.log(`Measurement ${id} updated:`, { field, value });
  }, [subgoals, onChange]);
  
  // Remove a subgoal
  const handleRemoveSubgoal = useCallback((id: string) => {
    const updatedSubgoals = subgoals.filter(subgoal => subgoal.id !== id);
    onChange(updatedSubgoals);
    console.log('Measurement removed:', id);
  }, [subgoals, onChange]);
  
  // Reorder subgoals
  const moveSubgoal = useCallback((fromIndex: number, toIndex: number) => {
    const updatedSubgoals = [...subgoals];
    const [movedSubgoal] = updatedSubgoals.splice(fromIndex, 1);
    updatedSubgoals.splice(toIndex, 0, movedSubgoal);
    onChange(updatedSubgoals);
    console.log(`Measurement moved from index ${fromIndex} to ${toIndex}`);
  }, [subgoals, onChange]);

  return {
    handleAddSubgoal,
    handleUpdateSubgoal,
    handleRemoveSubgoal,
    moveSubgoal
  };
};
