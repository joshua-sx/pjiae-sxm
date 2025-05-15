import { useState, useMemo } from 'react';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { createUnifiedGoals } from '@/utils/goalTransformers';
import { divisions, getParentDivisions } from '@/types/divisions';

// Add supervisor names to mock goals
const enhanceGoalsWithSupervisors = (goals: UnifiedGoal[]): UnifiedGoal[] => {
  return goals.map(goal => {
    return {
      ...goal,
      createdBy: goal.createdBy || 'Supervisor' // Fallback name if none exists
    };
  });
};

export type EmployeeGoalSortColumn = 'employeeName' | 'title' | 'status' | 'departmentName' | 'progress' | 'createdAt' | null;
export type SortDirection = 'asc' | 'desc';

export const useEmployeeGoals = () => {
  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [sortColumn, setSortColumn] = useState<EmployeeGoalSortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  // Create enhanced mock goals with supervisor names
  const allGoals = useMemo(() => {
    const goals = enhanceGoalsWithSupervisors(createUnifiedGoals());
    // Keep only employee goals
    return goals.filter(goal => goal.type === 'employee');
  }, []);
  
  // Get available years from goals
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    allGoals.forEach(goal => {
      const year = new Date(goal.createdAt).getFullYear().toString();
      years.add(year);
    });
    return ['all', ...Array.from(years).sort()];
  }, [allGoals]);
  
  // Get parent divisions for filter
  const parentDivisions = useMemo(() => {
    return [{ id: 'all', name: 'All Divisions', director: '' }, ...getParentDivisions()];
  }, []);
  
  // Sort goals based on selected column and direction
  const sortGoals = (goals: UnifiedGoal[], column: EmployeeGoalSortColumn, direction: SortDirection): UnifiedGoal[] => {
    if (!column) return goals;
    
    return [...goals].sort((a, b) => {
      let valueA: any;
      let valueB: any;
      
      // Extract values based on column
      switch (column) {
        case 'employeeName':
          valueA = a.employeeName?.toLowerCase() || '';
          valueB = b.employeeName?.toLowerCase() || '';
          break;
        case 'departmentName':
          valueA = a.departmentName.toLowerCase();
          valueB = b.departmentName.toLowerCase();
          break;
        case 'title':
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case 'status':
          valueA = a.status;
          valueB = b.status;
          break;
        case 'progress':
          // Assuming progress is a number property
          valueA = a.progress || 0;
          valueB = b.progress || 0;
          break;
        case 'createdAt':
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }
      
      // Apply sort direction
      if (direction === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  };
  
  // Handle sort toggle
  const handleSort = (column: EmployeeGoalSortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  // Filter goals based on selected division and year
  const filteredGoals = useMemo(() => {
    // First filter by division and year
    const filtered = allGoals.filter(goal => {
      // Filter by division
      if (divisionFilter !== 'all') {
        const division = divisions.find(d => d.id === divisionFilter);
        if (!division || goal.departmentName !== division.name) {
          return false;
        }
      }
      
      // Filter by year
      if (yearFilter !== 'all') {
        const goalYear = new Date(goal.createdAt).getFullYear().toString();
        if (goalYear !== yearFilter) {
          return false;
        }
      }
      
      return true;
    });
    
    // Then sort the filtered results
    return sortGoals(filtered, sortColumn, sortDirection);
  }, [allGoals, divisionFilter, yearFilter, sortColumn, sortDirection]);
  
  return {
    filteredGoals,
    divisionFilter,
    setDivisionFilter,
    yearFilter,
    setYearFilter,
    parentDivisions,
    availableYears,
    sortColumn,
    sortDirection,
    handleSort
  };
};
