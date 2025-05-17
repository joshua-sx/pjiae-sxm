
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGoalsQuery } from '@/hooks/useGoalsQuery';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorAlert } from '@/components/ui/error-alert';
import { PageHeader } from '@/components/common/PageHeader';

const MyGoals = () => {
  const { hasPermission } = useAuth();
  const canProposeGoal = hasPermission('canProposeGoal') || hasPermission('canSubmitSelfReview');
  
  const { data: goals, isLoading, isError, error, refetch } = useGoalsQuery({
    select: (data) => data.filter(goal => goal.employeeId === "101") // In a real app, use the current user's ID
  });
  
  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'Completed': return 'secondary';
      case 'In Progress': return 'default';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="page-wrapper">
          <PageHeader
            title="My Goals"
            subtitle="Track and manage your personal goals"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingState count={3} variant="card" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <div className="page-wrapper">
          <PageHeader
            title="My Goals"
            subtitle="Track and manage your personal goals"
          />
          <ErrorAlert 
            title="Failed to load goals" 
            description="Unable to retrieve your goals at this time." 
            error={error}
            onRetry={refetch}
          />
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="page-wrapper">
        <PageHeader
          title="My Goals"
          subtitle="Track and manage your personal goals"
          actions={canProposeGoal && (
            <Button asChild>
              <Link to="/my-goals/propose">
                <Plus className="mr-2 h-4 w-4" />
                Propose New Goal
              </Link>
            </Button>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals && goals.map((goal) => (
            <Card key={goal.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <Badge variant={getBadgeVariant(goal.status)}>
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
          
          {goals && goals.length === 0 && (
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
