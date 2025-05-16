
import React from 'react';

interface DivisionGoalsHeaderProps {
  isReadOnly: boolean;
}

const DivisionGoalsHeader = ({ isReadOnly }: DivisionGoalsHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Division Goals</h1>
      <p className="text-muted-foreground mt-2">
        {isReadOnly 
          ? 'View division-level goals and their progress' 
          : 'Manage and track division-level strategic goals'}
      </p>
    </div>
  );
};

export default DivisionGoalsHeader;
