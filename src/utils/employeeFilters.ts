
import { Employee, EmployeeFilters, SortColumn, SortDirection } from '@/types/employee';
import { UserRole } from '@/lib/permissions';

// Helper function to filter employees based on user role and filters
export function filterEmployeesByRole(employees: Employee[], userRole: UserRole, userDeptId?: string, userDivId?: string): Employee[] {
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
export function matchesSearch(str: string | undefined, search: string): boolean {
  if (!str) return false;
  return str.toLowerCase().includes(search.toLowerCase());
}

export function applyFilters(employees: Employee[], filters: EmployeeFilters): Employee[] {
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
  
  // Filter by status
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter(emp => 
      filters.status!.some(status => status === emp.status)
    );
  }
  
  return filtered;
}

export function applySort(employees: Employee[], sortColumn: SortColumn, sortDirection: SortDirection): Employee[] {
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

export function applyPagination(employees: Employee[], pagination: { page: number, limit: number }): { 
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
