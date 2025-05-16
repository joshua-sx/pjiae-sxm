
import React from 'react';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorAlert } from '@/components/ui/error-alert';
import EmployeeDirectoryTable from '@/components/employees/EmployeeDirectoryTable';
import EmployeePagination from '@/components/employees/EmployeePagination';
import { Employee, SortColumn, SortDirection } from '@/types/employee';

interface EmployeeDirectoryResultsProps {
  isLoading: boolean;
  error: unknown;
  employees?: Employee[];
  total?: number;
  page: number;
  limit: number;
  totalPages: number;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  handleSort: (column: string) => void;
  setPage: (page: number) => void;
}

export default function EmployeeDirectoryResults({
  isLoading,
  error,
  employees,
  total,
  page,
  limit,
  totalPages,
  sortColumn,
  sortDirection,
  handleSort,
  setPage
}: EmployeeDirectoryResultsProps) {
  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingState />
      </div>
    );
  }
  
  if (error) {
    return (
      <ErrorAlert
        title="Failed to load employees"
        description="There was an error loading the employee data. Please try again."
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <EmployeeDirectoryTable
        employees={employees || []}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          {total 
            ? `Showing ${(page - 1) * limit + 1} to ${Math.min(page * limit, total)} of ${total} employees` 
            : 'No employees found'}
        </div>
        
        <EmployeePagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
