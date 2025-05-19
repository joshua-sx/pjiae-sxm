
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { type Subgoal } from '@/components/goals/employee-form/types';
import { SubgoalItem } from './subgoal/SubgoalItem';
import { EmptyState } from './subgoal/EmptyState';
import { useSubgoalManager } from '@/hooks/useSubgoalManager';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

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

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates as any, // Adding type assertion to avoid TypeScript errors
    })
  );

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = subgoals.findIndex((subgoal) => subgoal.id === active.id);
      const newIndex = subgoals.findIndex((subgoal) => subgoal.id === over.id);
      
      moveSubgoal(oldIndex, newIndex);
    }
  };
  
  return (
    <div className="space-y-6">
      {subgoals.length === 0 ? (
        <EmptyState onAddSubgoal={handleAddSubgoal} />
      ) : (
        <>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={subgoals.map(subgoal => subgoal.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
                {subgoals.map((subgoal) => (
                  <SubgoalItem
                    key={subgoal.id}
                    subgoal={subgoal}
                    onUpdate={handleUpdateSubgoal}
                    onRemove={handleRemoveSubgoal}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          
          <Button onClick={handleAddSubgoal} variant="default" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Measurement
          </Button>
        </>
      )}
    </div>
  );
};
