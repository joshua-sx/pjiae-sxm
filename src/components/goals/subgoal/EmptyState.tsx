
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddSubgoal: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddSubgoal }) => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-md border border-dashed border-gray-300">
      <p className="text-muted-foreground mb-6">No measurements defined yet</p>
      <Button onClick={onAddSubgoal} variant="default" size="lg">
        <Plus className="mr-2 h-5 w-5" />
        Add First Measurement
      </Button>
    </div>
  );
};
