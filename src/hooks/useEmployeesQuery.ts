
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import employeesData from '../mocks/employees.json';
import { Employee, EmployeeFilters, PaginationParams, EmployeesResponse, SortColumn, SortDirection } from '@/types/employee';
import { useAuth } from '@/contexts/AuthContext';
import { filterEmployeesByRole, applyFilters, applySort, applyPagination } from '@/utils/employeeFilters';

export function useEmployeesQuery(
  filters: EmployeeFilters = {},
  pagination: PaginationParams = { page: 1, limit: 10 },
  sortColumn: SortColumn = 'lastName',
  sortDirection: SortDirection = 'asc',
) {
  const { role, hasPermission } = useAuth();
  
  return useQuery({
    queryKey: ['employees', filters, pagination, sortColumn, sortDirection],
    queryFn: async (): Promise<EmployeesResponse> => {
      try {
        // Check if user has permission to view employee directory
        if (!hasPermission('canViewEmployeeDirectory')) {
          throw new Error('Access denied: You do not have permission to view the employee directory');
        }
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock user department and division IDs - in a real app these would come from auth context
        const userDeptId = '1'; // HR Department
        const userDivId = '1';  // Administration Division
        
        // Filter by role permissions
        const employeesByRole = filterEmployeesByRole(employeesData as Employee[], role, userDeptId, userDivId);
        
        // Apply search and filters
        const filteredEmployees = applyFilters(employeesByRole, filters);
        
        // Apply sorting
        const sortedEmployees = applySort(filteredEmployees, sortColumn, sortDirection);
        
        // Apply pagination
        const paginatedResults = applyPagination(sortedEmployees, pagination);
        
        return paginatedResults;
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : 'Failed to fetch employees data',
          variant: "destructive"
        });
        throw new Error('Failed to fetch employees data');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export { useEmployeeFiltersData } from './useEmployeeFiltersData';
