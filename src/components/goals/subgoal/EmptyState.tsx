
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddSubgoal: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddSubgoal }) => {
  return (
    <div className="text-center py-8 bg-gray-50 rounded-md border border-dashed border-gray-300">
      <p className="text-muted-foreground mb-4">No measurements defined yet</p>
      <Button onClick={onAddSubgoal} variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        Add First Measurement
      </Button>
    </div>
  );
};
