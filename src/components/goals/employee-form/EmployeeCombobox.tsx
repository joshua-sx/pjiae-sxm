"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Employee {
  id: string;
  name: string;
}

interface EmployeeComboboxProps {
  employees: Employee[];
  selectedEmployees: string[];
  onEmployeeSelect: (employeeIds: string[]) => void;
}

export function EmployeeCombobox({ 
  employees, 
  selectedEmployees, 
  onEmployeeSelect 
}: EmployeeComboboxProps) {
  const [open, setOpen] = React.useState(false)

  // Helper function to get employee names for display
  const getSelectedEmployeeNames = () => {
    if (selectedEmployees.length === 0) {
      return "Select an employee";
    }
    
    if (selectedEmployees.length === employees.length) {
      return "All employees selected";
    }
    
    if (selectedEmployees.length === 1) {
      const employee = employees.find(emp => emp.id === selectedEmployees[0]);
      return employee ? employee.name : "Select an employee";
    }
    
    return `${selectedEmployees.length} employees selected`;
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      // If all are selected, deselect all
      onEmployeeSelect([]);
    } else {
      // Otherwise select all
      onEmployeeSelect(employees.map(emp => emp.id));
    }
  };

  const handleSelect = (employeeId: string) => {
    if (selectedEmployees.includes(employeeId)) {
      // Remove from selection
      onEmployeeSelect(selectedEmployees.filter(id => id !== employeeId));
    } else {
      // Add to selection
      onEmployeeSelect([...selectedEmployees, employeeId]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {getSelectedEmployeeNames()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search employee..." className="h-9" />
          <CommandList>
            <CommandEmpty>No employee found.</CommandEmpty>
            <CommandGroup>
              {/* Select All option */}
              <CommandItem
                value="select-all-option"
                onSelect={handleSelectAll}
              >
                Select All Employees
                <Check
                  className={cn(
                    "ml-auto",
                    selectedEmployees.length === employees.length ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              
              {/* All employees */}
              {employees.map((employee) => (
                <CommandItem
                  key={employee.id}
                  value={employee.id}
                  onSelect={() => handleSelect(employee.id)}
                >
                  {employee.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedEmployees.includes(employee.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
