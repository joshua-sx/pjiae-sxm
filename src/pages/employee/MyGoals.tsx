
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock goals
const mockGoals = [
  {
    id: '1',
    title: 'Complete Project X Documentation',
    description: 'Finalize all technical documentation for Project X',
    status: 'In Progress',
    progress: 60,
    dueDate: '2024-06-30',
  },
  {
    id: '2',
    title: 'Improve Customer Response Time',
    description: 'Reduce average customer response time from 24 hours to 4 hours',
    status: 'Not Started',
    progress: 0,
    dueDate: '2024-07-15',
  },
  {
    id: '3',
    title: 'Learn New Framework',
    description: 'Complete online course and build a sample application',
    status: 'Completed',
    progress: 100,
    dueDate: '2024-05-31',
  }
];

const MyGoals = () => {
  const { hasPermission } = useAuth();
  const canProposeGoal = hasPermission('canProposeGoal') || hasPermission('canSubmitSelfReview');
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Goals</h1>
            <p className="text-muted-foreground mt-2">Track and manage your personal goals</p>
          </div>
          
          {canProposeGoal && (
            <Button asChild>
              <Link to="/my-goals/propose">
                <Plus className="mr-2 h-4 w-4" />
                Propose New Goal
              </Link>
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGoals.map((goal) => (
            <Card key={goal.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <Badge 
                    variant={
                      goal.status === 'Completed' ? 'secondary' :
                      goal.status === 'In Progress' ? 'default' : 'outline'
                    }
                  >
                    {goal.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                
                <div className="mt-auto space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Due: {goal.dueDate}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/my-goals/${goal.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {mockGoals.length === 0 && (
            <Card className="col-span-full p-8 text-center">
              <p className="text-muted-foreground mb-4">You don't have any goals yet.</p>
              {canProposeGoal && (
                <Button asChild>
                  <Link to="/my-goals/propose">
                    <Plus className="mr-2 h-4 w-4" />
                    Propose Your First Goal
                  </Link>
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyGoals;
