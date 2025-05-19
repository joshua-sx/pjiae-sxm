
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  isSubmitting?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ isSubmitting = false }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate('/employee-goals')}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>Submit Goal</Button>
    </div>
  );
};
