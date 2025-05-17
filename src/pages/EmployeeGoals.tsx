
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';

const EmployeeGoals = () => {
  const { role, hasPermission } = useAuth();
  const isEmployee = role === UserRole.EMPLOYEE;
  const canCreate = hasPermission('canCreateGoal');
  
  return (
    <MainLayout>
      <div className="page-wrapper">
        <PageHeader
          title={isEmployee ? 'My Goals' : 'Employee Goals'}
          subtitle={isEmployee 
            ? 'Review and track your personal performance goals' 
            : 'Manage and track employee-level performance goals'}
          actions={canCreate && (
            <Button asChild size="sm">
              <Link to="/employee-goals/create">
                <Plus className="mr-1 h-4 w-4" />
                Create Goal
              </Link>
            </Button>
          )}
        />

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
