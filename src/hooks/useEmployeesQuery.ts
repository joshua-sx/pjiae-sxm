
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import employeesData from '../mocks/employees.json';
import { Employee, EmployeeFilters, PaginationParams, EmployeesResponse, SortColumn, SortDirection, EmployeeStatus } from '@/types/employee';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/permissions';

// Helper function to filter employees based on user role and filters
function filterEmployeesByRole(employees: Employee[], userRole: UserRole, userDeptId?: string, userDivId?: string): Employee[] {
  if (userRole === UserRole.HR_OFFICER || userRole === UserRole.IT_ADMIN) {
    return employees; // HR and IT Admin see all employees
  } else if (userRole === UserRole.DIRECTOR && userDivId) {
    return employees.filter(emp => emp.divisionId === userDivId); // Directors see employees in their division
  } else if (userRole === UserRole.SUPERVISOR && userDeptId) {
    return employees.filter(emp => emp.departmentId === userDeptId); // Supervisors see employees in their department
  } else if (userRole === UserRole.EMPLOYEE) {
    // Employees should only see themselves, but for this mock implementation, 
    // we'll just return an empty array as they shouldn't see the directory
    return []; 
  } else {
    // Default case, return empty array
    return [];
  }
}

// Helper to check if a string includes the search term (case insensitive)
function matchesSearch(str: string | undefined, search: string): boolean {
  if (!str) return false;
  return str.toLowerCase().includes(search.toLowerCase());
}

function applyFilters(employees: Employee[], filters: EmployeeFilters): Employee[] {
  let filtered = employees;
  
  // Apply text search
  if (filters.search) {
    filtered = filtered.filter(emp => {
      return matchesSearch(emp.firstName, filters.search!) ||
        matchesSearch(emp.lastName, filters.search!) ||
        matchesSearch(emp.email, filters.search!) ||
        matchesSearch(emp.employeeId, filters.search!);
    });
  }
  
  // Filter by divisions
  if (filters.divisions && filters.divisions.length > 0) {
    filtered = filtered.filter(emp => filters.divisions!.includes(emp.divisionId));
  }
  
  // Filter by departments
  if (filters.departments && filters.departments.length > 0) {
    filtered = filtered.filter(emp => filters.departments!.includes(emp.departmentId));
  }
  
  // Filter by roles
  if (filters.roles && filters.roles.length > 0) {
    filtered = filtered.filter(emp => 
      filters.roles!.some(role => role === emp.role)
    );
  }
  
  // Filter by status - ensure we're comparing against EmployeeStatus values
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter(emp => 
      filters.status!.some(status => status === emp.status)
    );
  }
  
  return filtered;
}

function applySort(employees: Employee[], sortColumn: SortColumn, sortDirection: SortDirection): Employee[] {
  return [...employees].sort((a: any, b: any) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    
    if (!valueA && !valueB) return 0;
    if (!valueA) return sortDirection === 'asc' ? 1 : -1;
    if (!valueB) return sortDirection === 'asc' ? -1 : 1;
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    return sortDirection === 'asc' 
      ? (valueA > valueB ? 1 : -1)
      : (valueA < valueB ? 1 : -1);
  });
}

function applyPagination(employees: Employee[], pagination: PaginationParams): { 
  employees: Employee[],
  total: number,
  page: number,
  totalPages: number
} {
  const { page, limit } = pagination;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    employees: employees.slice(startIndex, endIndex),
    total: employees.length,
    page,
    totalPages: Math.ceil(employees.length / limit)
  };
}

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
