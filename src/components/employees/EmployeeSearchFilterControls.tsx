
import React from 'react';
import { Button } from '@/components/ui/button';
import EmployeeSearchInput from '@/components/employees/EmployeeSearchInput';
import EmployeeFilters from '@/components/employees/EmployeeFilters';
import { LoadingState } from '@/components/ui/loading-state';

interface EmployeeSearchFilterControlsProps {
  searchTerm: string;
  division: string;
  department: string;
  role: string;
  status: string;
  isLoadingFilters: boolean;
  filtersData: {
    divisions: { id: string, name: string }[];
    departments: { id: string, name: string }[];
    roles: string[];
    statuses: string[];
  } | undefined;
  handleSearchChange: (value: string) => void;
  handleResetFilters: () => void;
  setDivision: (value: string) => void;
  setDepartment: (value: string) => void;
  setRole: (value: string) => void;
  setStatus: (value: string) => void;
}

export default function EmployeeSearchFilterControls({
  searchTerm,
  division,
  department,
  role,
  status,
  isLoadingFilters,
  filtersData,
  handleSearchChange,
  handleResetFilters,
  setDivision,
  setDepartment,
  setRole,
  setStatus
}: EmployeeSearchFilterControlsProps) {
  const areFiltersActive = 
    searchTerm || 
    division !== 'all' || 
    department !== 'all' || 
    role !== 'all' || 
    status !== 'all';

  return (
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
            disabled={!areFiltersActive}
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
    </div>
  );
}
