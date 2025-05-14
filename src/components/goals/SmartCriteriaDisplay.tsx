
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartCriteria } from '@/types/goals';

interface SmartCriteriaDisplayProps {
  criteria: SmartCriteria;
}

const SmartCriteriaDisplay = ({ criteria }: SmartCriteriaDisplayProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">SMART Criteria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm">Specific</h4>
            <p className="text-sm text-muted-foreground">{criteria.specific}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Measurable</h4>
            <p className="text-sm text-muted-foreground">{criteria.measurable}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Achievable</h4>
            <p className="text-sm text-muted-foreground">{criteria.achievable}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Relevant</h4>
            <p className="text-sm text-muted-foreground">{criteria.relevant}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Time-bound</h4>
            <p className="text-sm text-muted-foreground">{criteria.timeBound}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartCriteriaDisplay;
