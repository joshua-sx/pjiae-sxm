
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, AlertCircle, Save, Check, X } from "lucide-react";
import { Employee, employees as initialEmployees, getAvailableAppraisers } from "@/data/mockEmployees";
import { useToast } from "@/hooks/use-toast";

const AppraiserAssignment = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [missingAssignmentsFilter, setMissingAssignmentsFilter] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [assignments, setAssignments] = useState<Record<string, { first?: string, second?: string }>>(
    initialEmployees.reduce((acc, employee) => {
      acc[employee.id] = {
        first: employee.firstAppraiserId,
        second: employee.secondAppraiserId
      };
      return acc;
    }, {} as Record<string, { first?: string, second?: string }>)
  );
  const [hasChanges, setHasChanges] = useState(false);
  
  // Get available appraisers (managers and directors)
  const appraisers = getAvailableAppraisers();
  
  // Extract unique departments for filtering
  const departments = ["all", ...Array.from(new Set(employees.map(e => e.department)))];
  
  // Check if an employee has missing assignments
  const hasMissingAssignments = (employee: Employee) => {
    return !assignments[employee.id]?.first;
  };
  
  // Filter employees based on search, department and missing assignments
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchTerm === "" || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    
    const matchesMissingAssignments = !missingAssignmentsFilter || hasMissingAssignments(employee);
    
    // Only show regular employees, not managers or directors who would be appraisers
    const isRegularEmployee = employee.role === "employee";
    
    return matchesSearch && matchesDepartment && matchesMissingAssignments && isRegularEmployee;
  });
  
  // Handle assignment changes
  const handleAssignmentChange = (employeeId: string, appraiserType: "first" | "second", appraiserId?: string) => {
    setAssignments(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [appraiserType]: appraiserId
      }
    }));
    setHasChanges(true);
  };
  
  // Handle save all assignments
  const handleSaveAll = () => {
    setEmployees(employees.map(employee => ({
      ...employee,
      firstAppraiserId: assignments[employee.id]?.first,
      secondAppraiserId: assignments[employee.id]?.second
    })));
    
    setHasChanges(false);
    
    toast({
      title: "Assignments Saved",
      description: "Appraiser assignments have been updated successfully."
    });
  };
  
  // Get appraiser name by ID
  const getAppraiserName = (appraiserId?: string) => {
    if (!appraiserId) return "Not Assigned";
    const appraiser = employees.find(e => e.id === appraiserId);
    return appraiser ? appraiser.name : "Unknown";
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1>Appraiser Assignments</h1>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <div className="w-full md:w-64">
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.filter(d => d !== "all").map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="missingAssignments"
                checked={missingAssignmentsFilter}
                onChange={(e) => setMissingAssignmentsFilter(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="missingAssignments" className="text-sm font-medium">
                Show only unassigned
              </label>
            </div>
          </div>
          
          <Button 
            onClick={handleSaveAll}
            disabled={!hasChanges}
            className={hasChanges ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Save size={16} className="mr-2" />
            Save All Changes
          </Button>
        </div>
        
        <div className="rounded-md border shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead className="w-1/4">1st Appraiser (Manager)</TableHead>
                <TableHead className="w-1/4">2nd Appraiser (Director)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow 
                    key={employee.id} 
                    className={hasMissingAssignments(employee) ? "bg-amber-50" : ""}
                  >
                    <TableCell>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.email}</div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.jobTitle}</TableCell>
                    <TableCell>
                      <div className="relative">
                        {hasMissingAssignments(employee) && (
                          <div className="absolute right-2 top-2">
                            <AlertCircle size={16} className="text-amber-500" />
                          </div>
                        )}
                        <Select
                          value={assignments[employee.id]?.first || ""}
                          onValueChange={(value) => handleAssignmentChange(employee.id, "first", value || undefined)}
                        >
                          <SelectTrigger className={hasMissingAssignments(employee) ? "border-amber-300" : ""}>
                            <SelectValue placeholder="Select appraiser" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Not Assigned</SelectItem>
                            {appraisers.filter(a => a.role === "manager").map((appraiser) => (
                              <SelectItem key={appraiser.id} value={appraiser.id}>
                                {appraiser.name} ({appraiser.department})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {assignments[employee.id]?.first && (
                          <div className="text-xs text-gray-500 mt-1">
                            Current: {getAppraiserName(assignments[employee.id]?.first)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={assignments[employee.id]?.second || ""}
                        onValueChange={(value) => handleAssignmentChange(employee.id, "second", value || undefined)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select appraiser (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Not Assigned</SelectItem>
                          {appraisers.filter(a => a.role === "director").map((appraiser) => (
                            <SelectItem key={appraiser.id} value={appraiser.id}>
                              {appraiser.name} ({appraiser.department})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {assignments[employee.id]?.second && (
                        <div className="text-xs text-gray-500 mt-1">
                          Current: {getAppraiserName(assignments[employee.id]?.second)}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {hasChanges && (
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveAll}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save size={16} className="mr-2" />
              Save All Changes
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AppraiserAssignment;
