
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Employee } from '@/types/employee';
import { filterEmployeesByRole } from '@/utils/employeeFilters';
import employeesData from '../mocks/employees.json';

// Get unique values for dropdown filters
export function useEmployeeFiltersData() {
  const { role, hasPermission } = useAuth();
  
  return useQuery({
    queryKey: ['employeeFiltersData'],
    queryFn: async () => {
      // Check if user has permission to view employee directory
      if (!hasPermission('canViewEmployeeDirectory')) {
        throw new Error('Access denied: You do not have permission to view the employee directory');
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock user department and division IDs - in a real app these would come from auth context
      const userDeptId = '1'; // HR Department
      const userDivId = '1';  // Administration Division
      
      // Filter by role permissions
      const employeesByRole = filterEmployeesByRole(employeesData as Employee[], role, userDeptId, userDivId);
      
      // Extract unique values for filters
      const divisions = Array.from(new Set(employeesByRole.map(emp => emp.divisionId)))
        .map(id => {
          const division = employeesByRole.find(emp => emp.divisionId === id);
          return { id, name: division?.divisionName || 'Unknown' };
        });
      
      const departments = Array.from(new Set(employeesByRole.map(emp => emp.departmentId)))
        .map(id => {
          const dept = employeesByRole.find(emp => emp.departmentId === id);
          return { id, name: dept?.departmentName || 'Unknown' };
        });
      
      const roles = Array.from(new Set(employeesByRole.map(emp => emp.role)));
      const statuses = Array.from(new Set(employeesByRole.map(emp => emp.status)));
      
      return {
        divisions,
        departments,
        roles,
        statuses
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
