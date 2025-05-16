
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FlaggedItemsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  phaseFilter: string;
  setPhaseFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export const FlaggedItemsFilters = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  phaseFilter,
  setPhaseFilter,
  statusFilter,
  setStatusFilter,
}: FlaggedItemsFiltersProps) => {
  // Phases for filtering
  const phases = [
    { value: "all", label: "All Phases" },
    { value: "goal-setting", label: "Goal Setting" },
    { value: "mid-year-review", label: "Mid-Year Review" },
    { value: "year-end-evaluation", label: "Year-End Evaluation" }
  ];
  
  // Status options for filtering
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "flagged", label: "Flagged" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" }
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Search input is passed from parent */}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search employee or item..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 pb-4">
        <div className="w-full md:w-1/4">
          <Select
            value={typeFilter}
            onValueChange={setTypeFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="goal">Goals</SelectItem>
              <SelectItem value="appraisal">Appraisals</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4">
          <Select
            value={phaseFilter}
            onValueChange={setPhaseFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by phase" />
            </SelectTrigger>
            <SelectContent>
              {phases.map((phase) => (
                <SelectItem key={phase.value} value={phase.value}>
                  {phase.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
