
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PlusCircle, Search, Filter } from "lucide-react";
import GoalCard from '@/components/goals/GoalCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockDepartmentGoals } from '@/data/mockGoals';
import MainLayout from '@/components/layouts/MainLayout';

const DepartmentGoals = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const canCreateGoals = role === 'Director';
  
  const filteredGoals = mockDepartmentGoals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         goal.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleGoalClick = (goalId: string) => {
    navigate(`/department-goals/${goalId}`);
  };

  const handleCreateGoal = () => {
    navigate('/department-goals/create');
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Department Goals</h1>
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
              placeholder="Search department goals..."
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
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
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
        </div>
        
        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onClick={handleGoalClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No department goals found. {canCreateGoals && 'Click "Create New Goal" to add one.'}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DepartmentGoals;
