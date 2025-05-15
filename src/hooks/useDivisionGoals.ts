import { useState, useMemo } from 'react';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { createUnifiedGoals } from '@/utils/goalTransformers';
import { divisions, getParentDivisions } from '@/types/divisions';

// Add director names to mock goals
const enhanceGoalsWithDirectors = (goals: UnifiedGoal[]): UnifiedGoal[] => {
  return goals.map(goal => {
    const division = divisions.find(d => d.name === goal.departmentName || d.id === goal.departmentName);
    return {
      ...goal,
      createdBy: division?.director || goal.createdBy
    };
  });
};

export const useDivisionGoals = () => {
  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  
  // Create enhanced mock goals with real director names
  const allGoals = useMemo(() => {
    const goals = enhanceGoalsWithDirectors(createUnifiedGoals());
    // Keep only department goals
    return goals.filter(goal => goal.type === 'department');
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
  
  // Filter goals based on selected division and year
  const filteredGoals = useMemo(() => {
    return allGoals.filter(goal => {
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
  }, [allGoals, divisionFilter, yearFilter]);
  
  return {
    filteredGoals,
    divisionFilter,
    setDivisionFilter,
    yearFilter,
    setYearFilter,
    parentDivisions,
    availableYears
  };
};
