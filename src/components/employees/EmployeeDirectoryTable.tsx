
import React from 'react';
import { AppTable } from '@/components/common/AppTable';
import { employeeDirectoryColumns } from '@/components/columns/employeeColumns';
import { Employee } from '@/types/employee';

interface EmployeeDirectoryTableProps {
  employees: Employee[];
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
  isLoading?: boolean;
}

export default function EmployeeDirectoryTable({ 
  employees, 
  sortColumn, 
  sortDirection, 
  onSort,
  isLoading = false
}: EmployeeDirectoryTableProps) {
  return (
    <AppTable
      columns={employeeDirectoryColumns}
      data={employees}
      isLoading={isLoading}
      sortColumn={sortColumn as keyof Employee}
      sortDirection={sortDirection}
      onSort={onSort as (column: keyof Employee) => void}
      emptyMessage="No employees found matching your criteria."
    />
  );
}
