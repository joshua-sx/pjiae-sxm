
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorAlert } from "@/components/ui/error-alert";
import DivisionGoalsTable from '@/components/goals/DivisionGoalsTable';
import FlagCommentDialog from '@/components/goals/FlagCommentDialog';
import ApproveGoalDialog from '@/components/goals/ApproveGoalDialog';
import { toast } from '@/components/ui/use-toast';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { useDivisionGoalsQuery } from '@/hooks/useDepartmentGoalsQuery';
import { useDivisionGoals } from '@/hooks/useDivisionGoals';

const DivisionGoals = () => {
  const { role } = useAuth();
  const isHROrIT = role === 'HR Officer' || role === 'IT Admin';
  const isReadOnly = role === 'IT Admin';
  
  // Use our custom hook for division goals filtering UI state
  const {
    sortColumn,
    sortDirection,
    handleSort
  } = useDivisionGoals();

  // State for filters
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  
  // Fetch data with React Query
  const { 
    data: departmentGoals, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useDivisionGoalsQuery();

  // State for dialogs
  const [selectedGoal, setSelectedGoal] = useState<UnifiedGoal | null>(null);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  
  // Handle flag goal action
  const handleFlagGoal = (goal: UnifiedGoal) => {
    setSelectedGoal(goal);
    setIsFlagDialogOpen(true);
  };
  
  // Handle approve goal action - opens the approval dialog
  const handleApproveGoalClick = (goal: UnifiedGoal) => {
    setSelectedGoal(goal);
    setIsApproveDialogOpen(true);
  };
  
  // Handle flag submit
  const handleFlagSubmit = (comment: string) => {
    // In a real app, this would send the flag comment to the API
    toast({
      title: "Goal Flagged",
      description: `The goal "${selectedGoal?.title}" has been flagged for review.`,
    });
    setIsFlagDialogOpen(false);
  };
  
  // Handle approve submit - confirms the approval
  const handleApproveConfirm = () => {
    // In a real app, this would update the goal status in the database
    toast({
      title: "Goal Approved",
      description: `The goal "${selectedGoal?.title}" has been approved.`,
    });
    setIsApproveDialogOpen(false);
  };

  // Calculate available divisions from data
  const divisions = departmentGoals 
    ? [{ id: 'all', name: 'All Divisions' }, ...departmentGoals.map(goal => ({
        id: goal.departmentId,
        name: goal.departmentName
      }))]
    : [{ id: 'all', name: 'All Divisions' }];

  // Remove duplicates from divisions array
  const uniqueDivisions = divisions.filter(
    (division, index, self) => 
      index === self.findIndex((d) => d.id === division.id)
  );

  // Available years for filtering
  const availableYears = ['all', '2023', '2024'];

  // Filter goals based on selected filters
  const filteredGoals = departmentGoals?.filter(goal => {
    const matchesDivision = divisionFilter === 'all' || goal.departmentId === divisionFilter;
    // We would extract year from dueDate in a real app
    const matchesYear = yearFilter === 'all' || goal.dueDate.includes(yearFilter);
    return matchesDivision && matchesYear;
  }) || [];
  
  if (isLoading) {
    return (
      <MainLayout>
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
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
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
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Division Goals</h1>
          <p className="text-muted-foreground mt-2">
            {isReadOnly 
              ? 'View division-level goals and their progress' 
              : 'Manage and track division-level strategic goals'}
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="w-64">
            <label className="text-sm font-medium mb-1 block">Division</label>
            <Select 
              value={divisionFilter} 
              onValueChange={setDivisionFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                {uniqueDivisions.map((division) => (
                  <SelectItem key={division.id} value={division.id}>
                    {division.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-64">
            <label className="text-sm font-medium mb-1 block">Year</label>
            <Select 
              value={yearFilter} 
              onValueChange={setYearFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Goals Table */}
        <Card>
          <CardContent className="pt-6">
            {filteredGoals.length > 0 ? (
              <DivisionGoalsTable 
                goals={filteredGoals} 
                onFlagGoal={handleFlagGoal}
                onApproveGoal={handleApproveGoalClick}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
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
      </div>

      {/* Flag Dialog */}
      {selectedGoal && (
        <FlagCommentDialog
          isOpen={isFlagDialogOpen}
          onClose={() => setIsFlagDialogOpen(false)}
          onSubmit={handleFlagSubmit}
          goalTitle={selectedGoal.title}
        />
      )}
      
      {/* Approve Dialog */}
      {selectedGoal && (
        <ApproveGoalDialog
          isOpen={isApproveDialogOpen}
          onClose={() => setIsApproveDialogOpen(false)}
          onConfirm={handleApproveConfirm}
          goalTitle={selectedGoal.title}
        />
      )}
    </MainLayout>
  );
};

export default DivisionGoals;
