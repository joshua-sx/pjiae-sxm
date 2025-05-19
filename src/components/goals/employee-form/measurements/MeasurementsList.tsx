
import React from 'react';
import { type Subgoal } from '../types';
import { SortableMeasurementItem } from './SortableMeasurementItem';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface MeasurementsListProps {
  subgoals: Subgoal[];
  onEditSubgoal: (subgoal: Subgoal) => void;
  onRemoveSubgoal: (id: string) => void;
  onMoveSubgoal: (oldIndex: number, newIndex: number) => void;
}

export const MeasurementsList: React.FC<MeasurementsListProps> = ({
  subgoals,
  onEditSubgoal,
  onRemoveSubgoal,
  onMoveSubgoal
}) => {
  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handler for drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = subgoals.findIndex(subgoal => subgoal.id === active.id);
      const newIndex = subgoals.findIndex(subgoal => subgoal.id === over.id);
      
      onMoveSubgoal(oldIndex, newIndex);
    }
  };

  if (subgoals.length === 0) {
    return (
      <div className="text-center p-4 border border-dashed rounded-md">
        <p className="text-muted-foreground">No measurements added yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Click the "Add Measurement" button to define how this goal will be measured
        </p>
      </div>
    );
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={subgoals.map(s => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {subgoals.map((subgoal) => (
            <SortableMeasurementItem 
              key={subgoal.id}
              subgoal={subgoal}
              onEdit={() => onEditSubgoal(subgoal)}
              onDelete={() => onRemoveSubgoal(subgoal.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
