
import React from 'react';
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface PendingAppraisalFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentChange: (value: string) => void;
  phaseFilter: string;
  onPhaseChange: (value: string) => void;
  departments: string[];
  phases: string[];
}

const PendingAppraisalFilters = ({ 
  searchQuery, 
  onSearchChange,
  departmentFilter, 
  onDepartmentChange,
  phaseFilter,
  onPhaseChange,
  departments,
  phases
}: PendingAppraisalFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by employee or department..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select 
          value={departmentFilter} 
          onValueChange={onDepartmentChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select 
          value={phaseFilter} 
          onValueChange={onPhaseChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by phase" />
          </SelectTrigger>
          <SelectContent>
            {phases.map((phase) => (
              <SelectItem key={phase} value={phase}>
                {phase === 'all' ? 'All Phases' : phase}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PendingAppraisalFilters;
