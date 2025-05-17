
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Edit, Clock, CheckCircle, User } from "lucide-react";
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { mockDepartmentGoals } from '@/data/mockGoals';
import MainLayout from '@/components/layouts/MainLayout';
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import SmartCriteriaDisplay from '@/components/goals/SmartCriteriaDisplay';
import CommentsList from '@/components/goals/CommentsList';
import CommentForm from '@/components/goals/CommentForm';

const DepartmentGoalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useAuth();
  const [goal, setGoal] = useState(mockDepartmentGoals.find(g => g.id === id));
  
  const isDirector = role === 'Director';
  const isHR = role === 'HR Officer';
  
  // Simulate fetch
  useEffect(() => {
    if (!goal) {
      toast({
        title: "Goal not found",
        description: "The requested goal could not be found.",
        variant: "destructive",
      });
      navigate('/department-goals');
    }
  }, [goal, navigate, toast]);
  
  if (!goal) {
    return null;
  }

  const handleEdit = () => {
    navigate(`/department-goals/edit/${goal.id}`);
  };

  const handleSetDeadline = () => {
    // In a real app, this would open a date picker
    toast({
      title: "Deadline Updated",
      description: "The goal deadline has been set.",
    });
  };

  const handleApprove = () => {
    // In a real app, this would update the status in the database
    toast({
      title: "Goal Approved",
      description: "The goal has been approved successfully.",
    });
    
    // Update local state
    setGoal({
      ...goal,
      status: 'approved',
      updatedAt: new Date()
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/department-goals')}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Department Goals
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{goal.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <GoalStatusBadge status={goal.status} />
                <span className="text-sm text-muted-foreground">
                  Department: {goal.departmentName}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {isDirector && goal.status !== 'approved' && (
                <Button onClick={handleEdit} size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Goal
                </Button>
              )}
              
              {isHR && !goal.deadline && (
                <Button onClick={handleSetDeadline} size="sm" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Set Deadline
                </Button>
              )}
              
              {isHR && (goal.status === 'submitted' || goal.status === 'flagged') && (
                <Button onClick={handleApprove} size="sm" variant="default">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Goal
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Created by: {goal.createdBy}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Created: {format(new Date(goal.createdAt), 'MMM d, yyyy')}
            </div>
            {goal.deadline && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Deadline: {format(new Date(goal.deadline), 'MMM d, yyyy')}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700">{goal.description}</p>
            </div>
            
            <CommentsList comments={goal.comments} />
            
            <div className="mt-6">
              <CommentForm goalId={goal.id} />
            </div>
          </div>
          
          <div>
            <SmartCriteriaDisplay criteria={goal.smartCriteria} />
            
            {goal.assignedEmployeeGoals && goal.assignedEmployeeGoals.length > 0 && (
              <div className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-3">Linked Employee Goals</h2>
                  <p className="text-sm text-muted-foreground">
                    {goal.assignedEmployeeGoals.length} employee goal(s) linked to this department goal.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => toast({
                      title: "Feature in Development",
                      description: "View linked employee goals feature is coming soon."
                    })}
                  >
                    View Linked Goals
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DepartmentGoalDetail;
