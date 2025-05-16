
import React from 'react';
import { Column } from '@/components/common/AppTable';
import { Employee } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmployeeStatusBadge from '@/components/employees/EmployeeStatusBadge';

// Base columns for employee directory
export const baseEmployeeColumns: Column<Employee>[] = [
  { 
    key: 'lastName', 
    label: 'Name', 
    sortable: true, 
    width: 'w-[20%]',
    render: (employee) => (
      <div>
        {`${employee.lastName}, ${employee.firstName}`}
        <div className="text-xs text-muted-foreground mt-1">
          {employee.employeeId || ''}
        </div>
      </div>
    )
  },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'departmentName', label: 'Department', sortable: true },
  { key: 'divisionName', label: 'Division', sortable: true },
  { 
    key: 'status', 
    label: 'Status', 
    sortable: true,
    render: (employee) => <EmployeeStatusBadge status={employee.status} /> 
  },
  { 
    key: 'email', 
    label: 'Email', 
    sortable: true, 
    width: 'w-[20%]',
    render: (employee) => (
      <div className="max-w-[200px] truncate">{employee.email}</div>
    )
  },
];

// Actions column for employee directory
export const employeeActionsColumn: Column<Employee> = {
  key: 'actions',
  label: 'Actions',
  width: 'w-[180px]',
  render: (employee) => (
    <div className="flex justify-end space-x-2">
      <Button variant="outline" size="sm" asChild>
        <Link to={`/employees/${employee.id}`}>
          <Eye className="h-4 w-4 mr-1" />
          View
        </Link>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link to={`/employees/${employee.id}/edit`}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Link>
      </Button>
    </div>
  )
};

// Complete set of columns for employee directory
export const employeeDirectoryColumns: Column<Employee>[] = [
  ...baseEmployeeColumns,
  employeeActionsColumn
];

// Additional column sets based on roles
export const hrEmployeeColumns: Column<Employee>[] = [
  ...baseEmployeeColumns,
  employeeActionsColumn
];

export const managerEmployeeColumns: Column<Employee>[] = [
  ...baseEmployeeColumns.filter(col => col.key !== 'divisionName'), // Managers might not need division info
  employeeActionsColumn
];

// For role-specific views, these columns could be further customized
