
import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { useDepartmentGoalsQuery } from '@/hooks/useDepartmentGoalsQuery';
import { useDivisionGoals } from '@/hooks/useDivisionGoals';
import DivisionGoalsFilters from '@/components/divisions/DivisionGoalsFilters';
import DivisionGoalsContent from '@/components/divisions/DivisionGoalsContent';
import DivisionGoalsDialogs from '@/components/divisions/DivisionGoalsDialogs';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UserRole } from '@/lib/permissions';

const DivisionGoals = () => {
  const { role } = useAuth();
  const isHROrIT = role === UserRole.HR_OFFICER || role === UserRole.IT_ADMIN;
  const isDirector = role === UserRole.DIRECTOR;
  const isReadOnly = role === UserRole.IT_ADMIN;
  
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
  } = useDepartmentGoalsQuery();

  // State for dialogs
  const [selectedGoal, setSelectedGoal] = useState<UnifiedGoal | null>(null);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  
  // Handle flag goal action - now with permission check
  const handleFlagGoal = (goal: UnifiedGoal) => {
    // Only HR Officers can flag goals
    if (role !== UserRole.HR_OFFICER) {
      toast({
        title: "Permission Denied",
        description: "Only HR Officers can flag goals",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedGoal(goal);
    setIsFlagDialogOpen(true);
  };
  
  // Handle approve goal action - now with permission check
  const handleApproveGoalClick = (goal: UnifiedGoal) => {
    // Only HR Officers can approve goals
    if (role !== UserRole.HR_OFFICER) {
      toast({
        title: "Permission Denied",
        description: "Only HR Officers can approve goals",
        variant: "destructive"
      });
      return;
    }
    
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
        id: goal.department,
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

  // Apply role-based filtering
  const roleFilteredGoals = useMemo(() => {
    if (!departmentGoals) return [];
    
    if (isHROrIT) {
      // HR Officers and IT Admins can see all goals
      return departmentGoals;
    } else if (isDirector) {
      // Directors can see only their own division's goals
      // In a real app, we would match the user's ID with the division director ID
      // For this mock, we'll filter by the director's name which is in createdBy
      const directorName = "Jennifer Lee"; // Mock - in a real app, get from user profile
      return departmentGoals.filter(goal => goal.createdBy === directorName);
    } else {
      // Other roles see nothing or a filtered subset
      return [];
    }
  }, [departmentGoals, isHROrIT, isDirector]);

  // Filter goals based on selected filters
  const filteredGoals = useMemo(() => {
    return roleFilteredGoals.filter(goal => {
      const matchesDivision = divisionFilter === 'all' || goal.department === divisionFilter;
      // Extract the year from createdAt
      const goalYear = new Date(goal.createdAt).getFullYear().toString();
      const matchesYear = yearFilter === 'all' || goalYear === yearFilter;
      return matchesDivision && matchesYear;
    });
  }, [roleFilteredGoals, divisionFilter, yearFilter]);
  
  // If the user is a director, auto-select their division
  // In a real app, this would be done when we know the director's division
  // For now, we'll just use the first goal in roleFilteredGoals if they're a director
  const directorDivision = useMemo(() => {
    if (isDirector && roleFilteredGoals.length > 0) {
      return roleFilteredGoals[0].department;
    }
    return 'all';
  }, [isDirector, roleFilteredGoals]);

  // Auto-select the director's division on initial load
  // Only update if the division filter is 'all' and we have a directorDivision
  React.useEffect(() => {
    if (isDirector && divisionFilter === 'all' && directorDivision !== 'all') {
      setDivisionFilter(directorDivision);
    }
  }, [isDirector, directorDivision, divisionFilter]);

  // Show no access alert for unauthorized users
  if (!isHROrIT && !isDirector) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Division Goals</h1>
            <p className="text-muted-foreground mt-2">
              Division-level strategic goals
            </p>
          </div>
          
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to view division goals. Please contact HR if you believe this is an error.
            </AlertDescription>
          </Alert>
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
        
        {/* Filters - disable division selector for directors */}
        <DivisionGoalsFilters
          divisionFilter={divisionFilter}
          setDivisionFilter={setDivisionFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          divisions={uniqueDivisions}
          availableYears={availableYears}
          disableDivisionFilter={isDirector}
        />

        {/* Goals Table */}
        <DivisionGoalsContent
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
          filteredGoals={filteredGoals}
          onFlagGoal={handleFlagGoal}
          onApproveGoalClick={handleApproveGoalClick}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
          isReadOnly={isReadOnly}
          userRole={role}
        />
      </div>

      {/* Dialogs */}
      <DivisionGoalsDialogs
        selectedGoal={selectedGoal}
        isFlagDialogOpen={isFlagDialogOpen}
        isApproveDialogOpen={isApproveDialogOpen}
        setIsFlagDialogOpen={setIsFlagDialogOpen}
        setIsApproveDialogOpen={setIsApproveDialogOpen}
        onFlagSubmit={handleFlagSubmit}
        onApproveConfirm={handleApproveConfirm}
      />
    </MainLayout>
  );
};

export default DivisionGoals;
