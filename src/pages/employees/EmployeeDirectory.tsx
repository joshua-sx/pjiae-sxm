
import React, { useState, useCallback } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorAlert } from '@/components/ui/error-alert';
import { useEmployeesQuery, useEmployeeFiltersData } from '@/hooks/useEmployeesQuery';
import EmployeeDirectoryTable from '@/components/employees/EmployeeDirectoryTable';
import EmployeeSearchInput from '@/components/employees/EmployeeSearchInput';
import EmployeeFilters from '@/components/employees/EmployeeFilters';
import EmployeePagination from '@/components/employees/EmployeePagination';
import { EmployeeFilters as FiltersType, SortColumn, SortDirection } from '@/types/employee';
import { useAuth, UserRole } from '@/contexts/AuthContext';

export default function EmployeeDirectory() {
  // Access control
  const { hasPermission } = useAuth();
  
  // State for search, filters, pagination, and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [division, setDivision] = useState('all');
  const [department, setDepartment] = useState('all');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>('lastName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const limit = 10;

  // Build filters object
  const filters: FiltersType = {
    search: searchTerm,
    ...(division !== 'all' && { divisions: [division] }),
    ...(department !== 'all' && { departments: [department] }),
    ...(role !== 'all' && { roles: [role as UserRole] }), // Cast role to UserRole
    ...(status !== 'all' && { status: [status] }),
  };

  // Fetch employees with filters and pagination
  const { data: employeesData, isLoading: isLoadingEmployees, error: employeesError } = 
    useEmployeesQuery(filters, { page, limit }, sortColumn, sortDirection);

  // Fetch filter options
  const { data: filtersData, isLoading: isLoadingFilters } = useEmployeeFiltersData();

  // Handle sort column changes
  const handleSort = useCallback((column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column as SortColumn);
      setSortDirection('asc');
    }
    setPage(1); // Reset to first page when sorting changes
  }, [sortColumn, sortDirection]);

  // Handle filter changes
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page when search changes
  }, []);

  // Handle filter resets
  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setDivision('all');
    setDepartment('all');
    setRole('all');
    setStatus('all');
    setPage(1);
  }, []);

  // Check if user has permission to access this page
  if (!hasPermission('canViewEmployeeDirectory')) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="mt-2">You don't have permission to access the Employee Directory.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employee Directory</h1>
            <p className="text-muted-foreground mt-1">
              Manage and view all employees in the organization
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            {hasPermission('canManageUsers') && (
              <Button asChild>
                <Link to="/employees/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Employees</CardTitle>
            <CardDescription>
              Search and filter employees across the organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <EmployeeSearchInput
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full lg:max-w-sm"
                />
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResetFilters}
                    disabled={
                      !searchTerm && 
                      division === 'all' && 
                      department === 'all' && 
                      role === 'all' && 
                      status === 'all'
                    }
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>

              {isLoadingFilters ? (
                <div className="p-4">
                  <LoadingState />
                </div>
              ) : filtersData ? (
                <EmployeeFilters
                  divisions={filtersData.divisions}
                  departments={filtersData.departments}
                  roles={filtersData.roles}
                  statuses={filtersData.statuses}
                  selectedDivision={division}
                  selectedDepartment={department}
                  selectedRole={role}
                  selectedStatus={status}
                  onDivisionChange={setDivision}
                  onDepartmentChange={setDepartment}
                  onRoleChange={setRole}
                  onStatusChange={setStatus}
                />
              ) : null}

              {isLoadingEmployees ? (
                <div className="py-20">
                  <LoadingState />
                </div>
              ) : employeesError ? (
                <ErrorAlert
                  title="Failed to load employees"
                  description="There was an error loading the employee data. Please try again."
                  error={employeesError}
                  onRetry={() => window.location.reload()}
                />
              ) : (
                <>
                  <EmployeeDirectoryTable
                    employees={employeesData?.employees || []}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">
                      {employeesData?.total 
                        ? `Showing ${(page - 1) * limit + 1} to ${Math.min(page * limit, employeesData.total)} of ${employeesData.total} employees` 
                        : 'No employees found'}
                    </div>
                    
                    <EmployeePagination
                      currentPage={page}
                      totalPages={employeesData?.totalPages || 1}
                      onPageChange={setPage}
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
