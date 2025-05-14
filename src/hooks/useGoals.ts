
import { useState, useMemo } from 'react';
import { GoalStatus } from '@/types/goals';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { 
  createUnifiedGoals, 
  extractDepartments, 
  filterGoals 
} from '@/utils/goalTransformers';

export const useGoals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | GoalStatus>('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const allGoals = useMemo(() => createUnifiedGoals(), []);
  const departments = useMemo(() => extractDepartments(allGoals), [allGoals]);
  
  const filteredGoals = useMemo(() => 
    filterGoals(allGoals, searchQuery, statusFilter, departmentFilter),
    [allGoals, searchQuery, statusFilter, departmentFilter]
  );

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    allGoals,
    departments,
    filteredGoals
  };
};
