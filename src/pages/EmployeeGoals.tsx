
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const EmployeeGoals = () => {
  const { role, hasPermission } = useAuth();
  const isEmployee = role === UserRole.EMPLOYEE;
  const isReadOnly = role === UserRole.IT_ADMIN;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {isEmployee ? 'My Goals' : 'Employee Goals'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isEmployee 
                ? 'Review and track your personal performance goals' 
                : 'Manage and track employee-level performance goals'}
            </p>
          </div>
          
          {hasPermission('canCreateGoal') && (
            <Button asChild>
              <Link to="/employee-goals/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Goal
              </Link>
            </Button>
          )}
        </div>

        {/* Placeholder content - would be replaced with actual goals components */}
        <Card>
          <CardHeader>
            <CardTitle>{isEmployee ? 'My Performance Goals' : 'Employee Performance Goals'}</CardTitle>
            <CardDescription>
              {isEmployee 
                ? 'Your individual goals and targets' 
                : 'Individual employee goals and targets'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display {isEmployee ? 'your personal' : 'employee'} goals and their progress.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EmployeeGoals;
