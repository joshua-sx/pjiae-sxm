
import React, { useState, useCallback } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmployeesQuery, useEmployeeFiltersData } from '@/hooks/useEmployeesQuery';
import { EmployeeFilters as FiltersType, SortColumn, SortDirection, EmployeeStatus } from '@/types/employee';
import { useAuth } from '@/contexts/AuthContext';
import EmployeeDirectoryHeader from '@/components/employees/EmployeeDirectoryHeader';
import EmployeeSearchFilterControls from '@/components/employees/EmployeeSearchFilterControls';
import EmployeeDirectoryResults from '@/components/employees/EmployeeDirectoryResults';

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
    ...(role !== 'all' && { roles: [role] }),
    ...(status !== 'all' && { status: [status as EmployeeStatus] }),
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
        <EmployeeDirectoryHeader />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Employees</CardTitle>
            <CardDescription>
              Search and filter employees across the organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeSearchFilterControls
              searchTerm={searchTerm}
              division={division}
              department={department}
              role={role}
              status={status}
              isLoadingFilters={isLoadingFilters}
              filtersData={filtersData}
              handleSearchChange={handleSearchChange}
              handleResetFilters={handleResetFilters}
              setDivision={setDivision}
              setDepartment={setDepartment}
              setRole={setRole}
              setStatus={setStatus}
            />

            <EmployeeDirectoryResults
              isLoading={isLoadingEmployees}
              error={employeesError}
              employees={employeesData?.employees}
              total={employeesData?.total}
              page={page}
              limit={limit}
              totalPages={employeesData?.totalPages || 1}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              handleSort={handleSort}
              setPage={setPage}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
