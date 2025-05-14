
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
import { GoalStatus } from '@/types/goals';

interface GoalsFilterBarProps {
  searchQuery: string;
  statusFilter: 'all' | GoalStatus;
  departmentFilter: string;
  departments: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: 'all' | GoalStatus) => void;
  onDepartmentChange: (value: string) => void;
}

const GoalsFilterBar = ({
  searchQuery,
  statusFilter,
  departmentFilter,
  departments,
  onSearchChange,
  onStatusChange,
  onDepartmentChange
}: GoalsFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search goals, employees, departments..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select 
          value={statusFilter} 
          onValueChange={(value) => onStatusChange(value as 'all' | GoalStatus)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select 
          value={departmentFilter} 
          onValueChange={onDepartmentChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
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
    </div>
  );
};

export default GoalsFilterBar;
