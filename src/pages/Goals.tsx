
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from '@/contexts/AuthContext';
import { Search, Filter, PlusCircle, Eye } from "lucide-react";
import { mockDepartmentGoals } from '@/data/mockGoals';
import { mockEmployeeGoals } from '@/data/mockGoals';
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';

// Combine employee and department goals into a unified data structure
type UnifiedGoal = {
  id: string;
  employeeName: string;
  departmentName: string;
  title: string;
  status: string;
  createdBy: string;
  creatorRole: string;
  type: 'employee' | 'department';
  createdAt: Date;
};

const Goals = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Function to create unified goal objects
  const createUnifiedGoals = (): UnifiedGoal[] => {
    const departmentUnifiedGoals = mockDepartmentGoals.map(goal => ({
      id: goal.id,
      employeeName: 'Department Goal', // For department goals
      departmentName: goal.departmentName,
      title: goal.title,
      status: goal.status,
      createdBy: goal.createdBy,
      creatorRole: 'Director', // Assuming directors create department goals
      type: 'department' as const,
      createdAt: goal.createdAt
    }));

    const employeeUnifiedGoals = mockEmployeeGoals.map(goal => ({
      id: goal.id,
      employeeName: goal.employeeName,
      departmentName: 'HR', // Placeholder, in a real app we would have department info
      title: goal.title,
      status: goal.status,
      createdBy: goal.createdBy,
      creatorRole: 'Supervisor', // Assuming supervisors create employee goals
      type: 'employee' as const,
      createdAt: goal.createdAt
    }));

    return [...departmentUnifiedGoals, ...employeeUnifiedGoals];
  };

  const allGoals = createUnifiedGoals();

  // Extract unique departments for filter dropdown
  const departments = ['all', ...new Set(allGoals.map(goal => goal.departmentName))];

  // Apply filters
  const filteredGoals = allGoals.filter(goal => {
    const matchesSearch = 
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || goal.departmentName === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleGoalClick = (goalId: string, type: 'employee' | 'department') => {
    if (type === 'department') {
      navigate(`/department-goals/${goalId}`);
    } else {
      navigate(`/employee-goals/${goalId}`);
    }
  };

  const handleCreateGoal = () => {
    if (role === 'Director') {
      navigate('/department-goals/create');
    } else {
      navigate('/employee-goals/create');
    }
  };

  const canCreateGoals = role === 'Supervisor' || role === 'Director';

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Goals</h1>
          {canCreateGoals && (
            <Button onClick={handleCreateGoal}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Goal
            </Button>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search goals, employees, departments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
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
              onValueChange={setDepartmentFilter}
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
        
        {filteredGoals.length > 0 ? (
          <Table>
            <TableCaption>A list of all goals in the organization.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGoals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell className="font-medium">
                    {goal.employeeName}
                  </TableCell>
                  <TableCell>{goal.departmentName}</TableCell>
                  <TableCell>{goal.title}</TableCell>
                  <TableCell>
                    <GoalStatusBadge status={goal.status} />
                  </TableCell>
                  <TableCell>
                    {goal.createdBy} ({goal.creatorRole})
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGoalClick(goal.id, goal.type)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No goals found matching your filters. 
              {canCreateGoals && ' Click "Create New Goal" to add one.'}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Goals;
