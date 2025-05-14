import { DepartmentGoal, EmployeeGoal, GoalStatus } from '@/types/goals';
import { UnifiedGoal } from '@/types/unifiedGoals';
import { mockDepartmentGoals, mockEmployeeGoals } from '@/data/mockGoals';

export function createUnifiedGoals(): UnifiedGoal[] {
  const departmentGoals: UnifiedGoal[] = mockDepartmentGoals.map(goal => ({
    ...goal,
    type: 'department',
    creatorName: 'System',
    creatorRole: 'System',
    department: goal.departmentName,
  }));

  const employeeGoals: UnifiedGoal[] = mockEmployeeGoals.map(goal => ({
    ...goal,
    type: 'employee',
    creatorName: goal.employeeName,
    creatorRole: 'Employee',
    department: goal.department,
  }));

  return [...departmentGoals, ...employeeGoals];
}

export function extractDepartments(goals: UnifiedGoal[]): string[] {
  const departments = new Set<string>();
  goals.forEach(goal => {
    if ('departmentName' in goal) {
      departments.add(goal.departmentName);
    } else {
      departments.add(goal.department);
    }
  });
  return Array.from(departments);
}

export function filterGoals(
  goals: UnifiedGoal[],
  searchQuery: string,
  statusFilter: 'all' | GoalStatus,
  departmentFilter: string
): UnifiedGoal[] {
  return goals.filter(goal => {
    // Status filter
    if (statusFilter !== 'all' && goal.status !== statusFilter) {
      return false;
    }

    // Department filter
    if (departmentFilter !== 'all') {
      if ('departmentName' in goal) {
        if (goal.departmentName !== departmentFilter) {
          return false;
        }
      } else {
        if (goal.department !== departmentFilter) {
          return false;
        }
      }
    }

    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    if (searchQuery) {
      const titleMatch = goal.title.toLowerCase().includes(searchLower);
      const descriptionMatch = goal.description.toLowerCase().includes(searchLower);
      const creatorMatch = goal.creatorName.toLowerCase().includes(searchLower);
      
      if (!titleMatch && !descriptionMatch && !creatorMatch) {
        return false;
      }
    }

    return true;
  });
}
