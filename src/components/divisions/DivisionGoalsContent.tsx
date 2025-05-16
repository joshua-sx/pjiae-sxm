
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DivisionGoalsTable from '@/components/goals/DivisionGoalsTable';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorAlert } from '@/components/ui/error-alert';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';
import { UserRole } from '@/lib/permissions';

interface DivisionGoalsContentProps {
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
  filteredGoals: UnifiedGoal[];
  onFlagGoal: (goal: UnifiedGoal) => void;
  onApproveGoalClick: (goal: UnifiedGoal) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  handleSort: (column: SortColumn) => void;
  isReadOnly: boolean;
  userRole: UserRole; // Add user role property
}

const DivisionGoalsContent = ({
  isLoading,
  isError,
  error,
  refetch,
  filteredGoals,
  onFlagGoal,
  onApproveGoalClick,
  sortColumn,
  sortDirection,
  handleSort,
  isReadOnly,
  userRole // Add user role parameter
}: DivisionGoalsContentProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Division Goals</h1>
          <p className="text-muted-foreground mt-2">
            {isReadOnly 
              ? 'View division-level goals and their progress' 
              : 'Manage and track division-level strategic goals'}
          </p>
        </div>
        
        <LoadingState count={6} variant="table" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Division Goals</h1>
          <p className="text-muted-foreground mt-2">
            {isReadOnly 
              ? 'View division-level goals and their progress' 
              : 'Manage and track division-level strategic goals'}
          </p>
        </div>
        
        <ErrorAlert 
          title="Failed to load division goals" 
          description="Unable to retrieve division goals at this time." 
          error={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {filteredGoals.length > 0 ? (
          <DivisionGoalsTable 
            goals={filteredGoals} 
            onFlagGoal={onFlagGoal}
            onApproveGoal={onApproveGoalClick}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            userRole={userRole} // Pass user role to the table
          />
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No division goals found matching your filters.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DivisionGoalsContent;
