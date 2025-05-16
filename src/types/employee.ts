
import { UserRole } from '@/lib/permissions';

export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  departmentId: string;
  departmentName: string;
  divisionId: string;
  divisionName: string;
  status: EmployeeStatus;
  hireDate?: string;
  employeeId?: string;
  phone?: string;
  managerId?: string;
  managerName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFilters {
  search?: string;
  divisions?: string[];
  departments?: string[];
  roles?: string[]; // Changed from UserRole[] to string[] for flexibility
  status?: EmployeeStatus[]; // This must be an array of EmployeeStatus values
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface EmployeesResponse {
  employees: Employee[];
  total: number;
  page: number;
  totalPages: number;
}

export type SortColumn = 'lastName' | 'firstName' | 'departmentName' | 'divisionName' | 'role' | 'status' | 'hireDate' | 'email';
export type SortDirection = 'asc' | 'desc';
