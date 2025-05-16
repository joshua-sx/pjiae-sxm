
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';
import { Employee } from '@/types/employee';
import EmployeeStatusBadge from './EmployeeStatusBadge';
import { Link } from 'react-router-dom';
import EmployeeTableHeader from './EmployeeTableHeader';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell,
  TableHead,
  EmptyTableRow
} from '@/components/ui/styled-table';

interface EmployeeDirectoryTableProps {
  employees: Employee[];
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
}

export default function EmployeeDirectoryTable({ 
  employees, 
  sortColumn, 
  sortDirection, 
  onSort 
}: EmployeeDirectoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <EmployeeTableHeader 
            column="lastName"
            label="Name"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <EmployeeTableHeader 
            column="role"
            label="Role"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <EmployeeTableHeader 
            column="departmentName"
            label="Department"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <EmployeeTableHeader 
            column="divisionName"
            label="Division"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <EmployeeTableHeader 
            column="status"
            label="Status"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <EmployeeTableHeader 
            column="email"
            label="Email"
            currentSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.length === 0 ? (
          <EmptyTableRow colSpan={7} message="No employees found" />
        ) : (
          employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                {`${employee.lastName}, ${employee.firstName}`}
                <div className="text-xs text-muted-foreground mt-1">
                  {employee.employeeId || ''}
                </div>
              </TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.departmentName}</TableCell>
              <TableCell>{employee.divisionName}</TableCell>
              <TableCell>
                <EmployeeStatusBadge status={employee.status} />
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {employee.email}
              </TableCell>
              <TableCell className="text-right space-x-2">
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
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
