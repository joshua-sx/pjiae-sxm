import React, { useState, useMemo } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@/components/ui/styled-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { StatusIndicator } from "@/components/organization/StatusIndicator";
import { RatingDisplay } from "@/components/organization/RatingDisplay";
import { EmployeeData } from "@/types/organization";

// Mock employee data
const mockEmployees: EmployeeData[] = [
  {
    id: "1",
    name: "John Doe",
    department: "Airport Operations",
    jobTitle: "Operations Manager",
    midYearStatus: "completed",
    midYearRating: 4.5,
    endYearStatus: "completed", 
    endYearRating: 4.2,
  },
  {
    id: "2",
    name: "Jane Smith",
    department: "Human Resources",
    jobTitle: "HR Specialist",
    midYearStatus: "completed",
    midYearRating: 3.8,
    endYearStatus: "not-started",
    endYearRating: null,
  },
  {
    id: "3",
    name: "Michael Brown",
    department: "Information Technology",
    jobTitle: "IT Manager",
    midYearStatus: "completed",
    midYearRating: 4.7,
    endYearStatus: "completed",
    endYearRating: 4.8,
  },
  {
    id: "4",
    name: "Sarah Johnson",
    department: "Finance",
    jobTitle: "Financial Analyst",
    midYearStatus: "not-started",
    midYearRating: null,
    endYearStatus: "not-started",
    endYearRating: null,
  },
  {
    id: "5",
    name: "Robert Wilson",
    department: "Security",
    jobTitle: "Security Supervisor",
    midYearStatus: "completed",
    midYearRating: 3.5,
    endYearStatus: "not-started",
    endYearRating: null,
  },
  {
    id: "6",
    name: "Emily Davis",
    department: "Customer Service",
    jobTitle: "Customer Service Manager",
    midYearStatus: "completed",
    midYearRating: 4.9,
    endYearStatus: "completed",
    endYearRating: 4.7,
  },
  {
    id: "7",
    name: "David Martinez",
    department: "Maintenance",
    jobTitle: "Maintenance Technician",
    midYearStatus: "not-started",
    midYearRating: null,
    endYearStatus: "not-started",
    endYearRating: null,
  },
  {
    id: "8",
    name: "Lisa Thompson",
    department: "Airport Operations",
    jobTitle: "Operations Coordinator",
    midYearStatus: "completed",
    midYearRating: 4.0,
    endYearStatus: "completed",
    endYearRating: 3.8,
  },
];

// Available departments for filtering
const departments = [
  "All Departments",
  "Airport Operations",
  "Human Resources",
  "Information Technology",
  "Finance",
  "Security",
  "Customer Service",
  "Maintenance",
];

// Available status options for filtering
const statusOptions = ["All Statuses", "Completed", "Not Started"];

// Available rating options for filtering
const ratingOptions = [
  "All Ratings",
  "Excellent (4.5+)",
  "Exceeds Expectations (3.5-4.4)",
  "Meets Expectations (2.5-3.4)",
  "Needs Improvement (1.5-2.4)",
  "Unsatisfactory (<1.5)",
];

const Organization = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [midYearStatusFilter, setMidYearStatusFilter] = useState("All Statuses");
  const [endYearStatusFilter, setEndYearStatusFilter] = useState("All Statuses");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Toggle sort direction or set new sort column
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Filter and sort employees based on current filters and search
  const filteredEmployees = useMemo(() => {
    return mockEmployees
      .filter((employee) => {
        // Search filter
        const matchesSearch =
          search === "" ||
          employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.jobTitle.toLowerCase().includes(search.toLowerCase());

        // Department filter
        const matchesDepartment =
          departmentFilter === "All Departments" ||
          employee.department === departmentFilter;

        // Status filters
        const matchesMidYearStatus =
          midYearStatusFilter === "All Statuses" ||
          (midYearStatusFilter === "Completed" &&
            employee.midYearStatus === "completed") ||
          (midYearStatusFilter === "Not Started" &&
            employee.midYearStatus === "not-started");

        const matchesEndYearStatus =
          endYearStatusFilter === "All Statuses" ||
          (endYearStatusFilter === "Completed" &&
            employee.endYearStatus === "completed") ||
          (endYearStatusFilter === "Not Started" &&
            employee.endYearStatus === "not-started");

        // Rating filter
        let matchesRating = true;
        if (ratingFilter !== "All Ratings") {
          const midYearRating = employee.midYearRating || 0;
          const endYearRating = employee.endYearRating || 0;
          const highestRating = Math.max(midYearRating, endYearRating);

          switch (ratingFilter) {
            case "Excellent (4.5+)":
              matchesRating = highestRating >= 4.5;
              break;
            case "Exceeds Expectations (3.5-4.4)":
              matchesRating = highestRating >= 3.5 && highestRating < 4.5;
              break;
            case "Meets Expectations (2.5-3.4)":
              matchesRating = highestRating >= 2.5 && highestRating < 3.5;
              break;
            case "Needs Improvement (1.5-2.4)":
              matchesRating = highestRating >= 1.5 && highestRating < 2.5;
              break;
            case "Unsatisfactory (<1.5)":
              matchesRating = highestRating < 1.5;
              break;
          }
        }

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesMidYearStatus &&
          matchesEndYearStatus &&
          matchesRating
        );
      })
      .sort((a, b) => {
        // Handle sorting based on selected column and direction
        if (sortBy === "name") {
          return sortDirection === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === "department") {
          return sortDirection === "asc"
            ? a.department.localeCompare(b.department)
            : b.department.localeCompare(a.department);
        } else if (sortBy === "jobTitle") {
          return sortDirection === "asc"
            ? a.jobTitle.localeCompare(b.jobTitle)
            : b.jobTitle.localeCompare(a.jobTitle);
        } else if (sortBy === "midYearRating") {
          const aRating = a.midYearRating || 0;
          const bRating = b.midYearRating || 0;
          return sortDirection === "asc" ? aRating - bRating : bRating - aRating;
        } else if (sortBy === "endYearRating") {
          const aRating = a.endYearRating || 0;
          const bRating = b.endYearRating || 0;
          return sortDirection === "asc" ? aRating - bRating : bRating - aRating;
        }
        return 0;
      });
  }, [
    search,
    departmentFilter,
    midYearStatusFilter,
    endYearStatusFilter,
    ratingFilter,
    sortBy,
    sortDirection,
  ]);

  // Handle row click - navigate to employee detail
  const handleRowClick = (employeeId: string) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1>Organization</h1>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 pb-4">
          <div className="w-full md:w-1/4">
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/4">
            <Select
              value={midYearStatusFilter}
              onValueChange={setMidYearStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Mid-Year Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/4">
            <Select
              value={endYearStatusFilter}
              onValueChange={setEndYearStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="End-Year Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/4">
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Employee Name
                  {sortBy === "name" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("department")}
              >
                <div className="flex items-center">
                  Department
                  {sortBy === "department" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("jobTitle")}
              >
                <div className="flex items-center">
                  Job Title
                  {sortBy === "jobTitle" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>

              <TableHead>Mid-Year Status</TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("midYearRating")}
              >
                <div className="flex items-center">
                  Mid-Year Rating
                  {sortBy === "midYearRating" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>

              <TableHead>End-Year Status</TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("endYearRating")}
              >
                <div className="flex items-center">
                  End-Year Rating
                  {sortBy === "endYearRating" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(employee.id)}
                >
                  <TableCell className="font-medium">
                    {employee.name}
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.jobTitle}</TableCell>
                  <TableCell>
                    <StatusIndicator status={employee.midYearStatus} />
                  </TableCell>
                  <TableCell>
                    <RatingDisplay rating={employee.midYearRating} />
                  </TableCell>
                  <TableCell>
                    <StatusIndicator status={employee.endYearStatus} />
                  </TableCell>
                  <TableCell>
                    <RatingDisplay rating={employee.endYearRating} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Organization;
