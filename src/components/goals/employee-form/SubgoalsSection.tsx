
import React from 'react';
import { SubgoalList } from '@/components/goals/SubgoalList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { type Subgoal } from '../employee-form/types';

interface SubgoalsSectionProps {
  subgoals: Subgoal[];
  onSubgoalsChange: (subgoals: Subgoal[]) => void;
}

export const SubgoalsSection: React.FC<SubgoalsSectionProps> = ({ subgoals, onSubgoalsChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subgoals & Measurements</CardTitle>
      </CardHeader>
      <CardContent>
        <SubgoalList 
          subgoals={subgoals} 
          onChange={onSubgoalsChange} 
        />
      </CardContent>
    </Card>
  );
};
