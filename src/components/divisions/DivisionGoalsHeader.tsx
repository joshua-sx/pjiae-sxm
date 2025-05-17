
import React from 'react';
import { H1 } from '@/components/ui/typography/Heading';

interface DivisionGoalsHeaderProps {
  isReadOnly: boolean;
}

const DivisionGoalsHeader = ({ isReadOnly }: DivisionGoalsHeaderProps) => {
  return (
    <div>
      <H1>Division Goals</H1>
      <p className="text-muted-foreground mt-2">
        {isReadOnly 
          ? 'View division-level goals and their progress' 
          : 'Manage and track division-level strategic goals'}
      </p>
    </div>
  );
};

export default DivisionGoalsHeader;
