import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  ChevronRight,
  Flag,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { mockDepartmentGoals } from '@/data/mockGoals';
import MainLayout from '@/components/layouts/MainLayout';
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import { PageHeader } from '@/components/common/PageHeader';

const HRGoalsDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useAuth();
  
  // Redirect if not HR
  React.useEffect(() => {
    if (role !== 'HR Officer') {
      toast({
        title: "Access Denied",
        description: "Only HR Officers can access this dashboard.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [role, navigate, toast]);

  // Filter goals by status
  const submittedGoals = mockDepartmentGoals.filter(g => g.status === 'submitted');
  const flaggedGoals = mockDepartmentGoals.filter(g => g.status === 'flagged');
  const approvedGoals = mockDepartmentGoals.filter(g => g.status === 'approved');
  
  // Set deadline functionality
  const handleSetDeadline = (goalId: string) => {
    toast({
      title: "Set Deadline",
      description: "Deadline setting dialog would appear here.",
    });
  };
  
  // View goal details
  const handleViewGoal = (goalId: string) => {
    navigate(`/department-goals/${goalId}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="HR Goals Dashboard"
          subtitle="Review and manage all department and employee goals"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Pending Review</span>
              </CardTitle>
              <CardDescription>Goals awaiting HR review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{submittedGoals.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-amber-500" />
                <span>Flagged</span>
              </CardTitle>
              <CardDescription>Goals flagged for revisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{flaggedGoals.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Approved</span>
              </CardTitle>
              <CardDescription>Goals approved by HR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{approvedGoals.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="pending" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {submittedGoals.length > 0 ? (
              submittedGoals.map(goal => (
                <Card key={goal.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{goal.title}</h3>
                          <GoalStatusBadge status={goal.status} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{goal.departmentName}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Submitted on {format(new Date(goal.updatedAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSetDeadline(goal.id)}
                        >
                          <Calendar className="mr-1 h-4 w-4" />
                          Set Deadline
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleViewGoal(goal.id)}
                        >
                          Review
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-medium text-lg">No pending goals</h3>
                <p className="text-muted-foreground">All department goals have been reviewed.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="flagged" className="space-y-4">
            {flaggedGoals.length > 0 ? (
              flaggedGoals.map(goal => (
                <Card key={goal.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{goal.title}</h3>
                          <GoalStatusBadge status={goal.status} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{goal.departmentName}</p>
                        <div className="flex items-center gap-1 text-amber-600 text-xs mt-1">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Flagged on {format(new Date(goal.updatedAt), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                      <div>
                        <Button 
                          size="sm"
                          onClick={() => handleViewGoal(goal.id)}
                        >
                          Review
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-medium text-lg">No flagged goals</h3>
                <p className="text-muted-foreground">There are currently no flagged goals requiring attention.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            {approvedGoals.length > 0 ? (
              approvedGoals.map(goal => (
                <Card key={goal.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{goal.title}</h3>
                          <GoalStatusBadge status={goal.status} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{goal.departmentName}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Approved on {format(new Date(goal.updatedAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewGoal(goal.id)}
                        >
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-2">
                  <AlertTriangle className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="font-medium text-lg">No approved goals</h3>
                <p className="text-muted-foreground">No goals have been approved yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default HRGoalsDashboard;
