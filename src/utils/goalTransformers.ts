
import { mockDepartmentGoals, mockEmployeeGoals } from '@/data/mockGoals';
import { UnifiedGoal } from '@/types/unifiedGoals';

// Function to create unified goal objects
export const createUnifiedGoals = (): UnifiedGoal[] => {
  const departmentUnifiedGoals = mockDepartmentGoals.map(goal => ({
    id: goal.id,
    employeeName: 'Department Goal', // For department goals
    departmentName: goal.departmentName,
    title: goal.title,
    status: goal.status,
    createdBy: goal.createdBy,
    creatorRole: 'Director', // Assuming directors create department goals
    type: 'department' as const,
    createdAt: goal.createdAt
  }));

  const employeeUnifiedGoals = mockEmployeeGoals.map(goal => ({
    id: goal.id,
    employeeName: goal.employeeName,
    departmentName: 'HR', // Placeholder, in a real app we would have department info
    title: goal.title,
    status: goal.status,
    createdBy: goal.createdBy,
    creatorRole: 'Supervisor', // Assuming supervisors create employee goals
    type: 'employee' as const,
    createdAt: goal.createdAt
  }));

  return [...departmentUnifiedGoals, ...employeeUnifiedGoals];
};

// Extract unique departments for filter dropdown
export const extractDepartments = (goals: UnifiedGoal[]): string[] => {
  return ['all', ...new Set(goals.map(goal => goal.departmentName))];
};

// Apply filters to goals
export const filterGoals = (
  goals: UnifiedGoal[], 
  searchQuery: string, 
  statusFilter: 'all' | GoalStatus, 
  departmentFilter: string
): UnifiedGoal[] => {
  return goals.filter(goal => {
    const matchesSearch = 
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || goal.departmentName === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });
};
