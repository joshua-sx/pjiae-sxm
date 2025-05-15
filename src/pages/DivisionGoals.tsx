
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const DivisionGoals = () => {
  const { role } = useAuth();
  const canCreate = role === 'Director' || role === 'HR Officer';
  const isReadOnly = role === 'Supervisor' || role === 'IT Admin';
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Division Goals</h1>
            <p className="text-muted-foreground mt-2">
              {isReadOnly 
                ? 'View division-level goals and their progress' 
                : 'Manage and track division-level strategic goals'}
            </p>
          </div>
          
          {canCreate && (
            <Button asChild>
              <Link to="/department-goals/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Goal
              </Link>
            </Button>
          )}
        </div>

        {/* Placeholder content - would be replaced with actual goals components */}
        <Card>
          <CardHeader>
            <CardTitle>Division Goals</CardTitle>
            <CardDescription>Strategic goals for your division</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display division-level goals and their progress.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DivisionGoals;
