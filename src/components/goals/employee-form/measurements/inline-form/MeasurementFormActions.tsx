
import React from 'react';
import { Button } from '@/components/ui/button';

interface MeasurementFormActionsProps {
  isValid: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export const MeasurementFormActions: React.FC<MeasurementFormActionsProps> = ({
  isValid,
  isEditing,
  onCancel,
  onSave
}) => {
  return (
    <div className="flex justify-end gap-2 border-t pt-4">
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={onSave} disabled={!isValid}>
        {isEditing ? 'Update' : 'Add'} Measurement
      </Button>
    </div>
  );
};
