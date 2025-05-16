
import { useState } from 'react';
import { UnifiedGoal } from '@/types/unifiedGoals';

// Updated to include "actions" as a non-sortable column type
export type SortColumn = 'departmentName' | 'createdBy' | 'title' | 'status' | 'createdAt' | 'actions';
export type SortDirection = 'asc' | 'desc';

export const useDivisionGoals = (initialGoals: UnifiedGoal[] = []) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>('departmentName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [goals, setGoals] = useState<UnifiedGoal[]>(initialGoals);

  const handleSort = (column: SortColumn) => {
    // Don't sort by actions column
    if (column === 'actions') return;
    
    // If clicking the same column, toggle direction
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, set to ascending by default
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedGoals = () => {
    // Don't sort if the column is "actions"
    if (sortColumn === 'actions') return goals;
    
    return [...goals].sort((a, b) => {
      let aValue = a[sortColumn as keyof UnifiedGoal];
      let bValue = b[sortColumn as keyof UnifiedGoal];

      // Handle date comparison
      if (sortColumn === 'createdAt') {
        aValue = new Date(aValue as Date).getTime();
        bValue = new Date(bValue as Date).getTime();
      } else {
        // Convert to lowercase strings for non-date comparisons
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  return {
    sortColumn,
    sortDirection,
    handleSort,
    getSortedGoals,
    setGoals,
  };
};

export default useDivisionGoals;
