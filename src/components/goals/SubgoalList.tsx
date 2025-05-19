
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { type Subgoal } from '@/components/goals/employee-form/types';
import { SubgoalItem } from './subgoal/SubgoalItem';
import { EmptyState } from './subgoal/EmptyState';
import { useSubgoalManager } from '@/hooks/useSubgoalManager';

interface SubgoalListProps {
  subgoals: Subgoal[];
  onChange: (subgoals: Subgoal[]) => void;
}

export const SubgoalList: React.FC<SubgoalListProps> = ({ subgoals, onChange }) => {
  const {
    handleAddSubgoal,
    handleUpdateSubgoal,
    handleRemoveSubgoal,
    moveSubgoal
  } = useSubgoalManager(subgoals, onChange);
  
  return (
    <div className="space-y-6">
      {subgoals.length === 0 ? (
        <EmptyState onAddSubgoal={handleAddSubgoal} />
      ) : (
        <div className="space-y-6">
          {subgoals.map((subgoal, index) => (
            <SubgoalItem
              key={subgoal.id}
              subgoal={subgoal}
              onUpdate={handleUpdateSubgoal}
              onRemove={handleRemoveSubgoal}
            />
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
