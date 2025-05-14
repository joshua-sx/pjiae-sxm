
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { PlusCircle } from "lucide-react";
import { useGoals } from '@/hooks/useGoals';
import GoalsTable from '@/components/goals/GoalsTable';
import GoalsFilterBar from '@/components/goals/GoalsFilterBar';

const Goals = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { 
    searchQuery, 
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    departments,
    filteredGoals
  } = useGoals();

  const handleCreateGoal = () => {
    if (role === 'Director') {
      navigate('/department-goals/create');
    } else {
      navigate('/employee-goals/create');
    }
  };

  const canCreateGoals = role === 'Supervisor' || role === 'Director';
  const canFlagGoals = role === 'HR Officer';
  const canApproveGoals = role === 'Director' || role === 'HR Officer';

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
        
        <GoalsFilterBar
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          departmentFilter={departmentFilter}
          departments={departments}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          onDepartmentChange={setDepartmentFilter}
        />
        
        {filteredGoals.length > 0 ? (
          <GoalsTable 
            goals={filteredGoals} 
            canFlagGoals={canFlagGoals} 
            canApproveGoals={canApproveGoals} 
          />
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
