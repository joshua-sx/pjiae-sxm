
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/permissions';
import { EmployeeStatus } from '@/types/employee';

interface FilterOption {
  id: string;
  name: string;
}

interface EmployeeFiltersProps {
  divisions: FilterOption[];
  departments: FilterOption[];
  roles: string[];
  statuses: string[];
  selectedDivision: string;
  selectedDepartment: string;
  selectedRole: string;
  selectedStatus: string;
  onDivisionChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function EmployeeFilters({
  divisions,
  departments,
  roles,
  statuses,
  selectedDivision,
  selectedDepartment,
  selectedRole,
  selectedStatus,
  onDivisionChange,
  onDepartmentChange,
  onRoleChange,
  onStatusChange
}: EmployeeFiltersProps) {
  const { role } = useAuth();
  
  // Determine which filters to show based on user role
  const showDivisionFilter = role === UserRole.HR_OFFICER || role === UserRole.IT_ADMIN;
  
  // For Director, division should be disabled and pre-selected
  const isDivisionDisabled = role === UserRole.DIRECTOR;
  
  // For Supervisor, department should be disabled and pre-selected
  const isDepartmentDisabled = role === UserRole.SUPERVISOR;
  
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {(showDivisionFilter || role === UserRole.DIRECTOR) && (
        <Select
          value={selectedDivision}
          onValueChange={onDivisionChange}
          disabled={isDivisionDisabled}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Division" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {!isDivisionDisabled && <SelectItem value="all">All Divisions</SelectItem>}
              {divisions.map((division) => (
                <SelectItem key={division.id} value={division.id}>
                  {division.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      
      {(role !== UserRole.EMPLOYEE) && (
        <Select
          value={selectedDepartment}
          onValueChange={onDepartmentChange}
          disabled={isDepartmentDisabled}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {!isDepartmentDisabled && <SelectItem value="all">All Departments</SelectItem>}
              {departments.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      
      <Select
        value={selectedRole}
        onValueChange={onRoleChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      <Select
        value={selectedStatus}
        onValueChange={onStatusChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
