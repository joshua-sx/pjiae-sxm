
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface DivisionGoalsFiltersProps {
  divisionFilter: string;
  setDivisionFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  divisions: { id: string; name: string }[];
  availableYears: string[];
  disableDivisionFilter?: boolean; // New prop for directors
}

const DivisionGoalsFilters = ({
  divisionFilter,
  setDivisionFilter,
  yearFilter,
  setYearFilter,
  divisions,
  availableYears,
  disableDivisionFilter = false // Default to enabled
}: DivisionGoalsFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-64">
        <label className="text-sm font-medium mb-1 block">Division</label>
        <Select 
          value={divisionFilter} 
          onValueChange={setDivisionFilter}
          disabled={disableDivisionFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select division" />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((division) => (
              <SelectItem key={division.id} value={division.id}>
                {division.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {disableDivisionFilter && (
          <p className="text-xs text-muted-foreground mt-1">
            As a director, you can only view your division's goals
          </p>
        )}
      </div>
      
      <div className="w-64">
        <label className="text-sm font-medium mb-1 block">Year</label>
        <Select 
          value={yearFilter} 
          onValueChange={setYearFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year === 'all' ? 'All Years' : year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DivisionGoalsFilters;
