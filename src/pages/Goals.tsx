
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { PlusCircle } from "lucide-react";
import { useGoals } from '@/hooks/useGoals';
import GoalsTable from '@/components/goals/GoalsTable';
import GoalsFilterBar from '@/components/goals/GoalsFilterBar';
import { PageHeader } from '@/components/common/PageHeader';

const Goals = () => {
  const navigate = useNavigate();
  const { role, hasPermission } = useAuth();
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
    if (role === UserRole.DIRECTOR) {
      navigate('/department-goals/create');
    } else {
      navigate('/employee-goals/create');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Goals"
          actions={hasPermission('canCreateGoal') && (
            <Button onClick={handleCreateGoal}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Goal
            </Button>
          )}
        />
        
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
            canFlagGoals={hasPermission('canFlagGoals')} 
            canApproveGoals={hasPermission('canApproveGoal')} 
          />
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No goals found matching your filters. 
              {hasPermission('canCreateGoal') && ' Click "Create New Goal" to add one.'}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Goals;
