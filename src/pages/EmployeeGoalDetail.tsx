
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ArrowLeft, 
  Edit, 
  Clock, 
  CheckCircle, 
  User, 
  Link as LinkIcon,
  BarChart
} from "lucide-react";
import { format } from 'date-fns';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { mockEmployeeGoals, mockDepartmentGoals } from '@/data/mockGoals';
import MainLayout from '@/components/layouts/MainLayout';
import GoalStatusBadge from '@/components/goals/GoalStatusBadge';
import SmartCriteriaDisplay from '@/components/goals/SmartCriteriaDisplay';
import CommentsList from '@/components/goals/CommentsList';
import CommentForm from '@/components/goals/CommentForm';

const EmployeeGoalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useAuth();
  const [goal, setGoal] = useState(mockEmployeeGoals.find(g => g.id === id));
  
  const isSupervisor = role === 'Supervisor' || role === 'Director';
  const isEmployee = role === 'Employee';
  const isMyGoal = true; // In a real app, this would check if the goal belongs to the logged-in employee
  
  // Get linked department goal
  const linkedDepartmentGoal = goal?.linkedDepartmentGoalId ? 
    mockDepartmentGoals.find(g => g.id === goal.linkedDepartmentGoalId) : null;
  
  // Simulate fetch
  useEffect(() => {
    if (!goal) {
      toast({
        title: "Goal not found",
        description: "The requested goal could not be found.",
        variant: "destructive",
      });
      navigate('/employee-goals');
    }
  }, [goal, navigate, toast]);
  
  if (!goal) {
    return null;
  }

  const handleEdit = () => {
    navigate(`/employee-goals/edit/${goal.id}`);
  };

  const handleUpdateProgress = () => {
    // In a real app, this would open a progress update dialog
    toast({
      title: "Progress Updated",
      description: "The goal progress has been updated.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/employee-goals')}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employee Goals
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold">{goal.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <GoalStatusBadge status={goal.status} />
                <span className="text-sm text-muted-foreground">
                  Employee: {goal.employeeName}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {isSupervisor && (
                <Button onClick={handleEdit} size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Goal
                </Button>
              )}
              
              {(isSupervisor || (isEmployee && isMyGoal)) && (
                <Button onClick={handleUpdateProgress} size="sm" variant="outline">
                  <BarChart className="mr-2 h-4 w-4" />
                  Update Progress
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Created by: Supervisor
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
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Progress</h3>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            </div>
            
            <CommentsList comments={goal.comments} />
            
            <div className="mt-6">
              <CommentForm goalId={goal.id} />
            </div>
          </div>
          
          <div>
            <SmartCriteriaDisplay criteria={goal.smartCriteria} />
            
            {linkedDepartmentGoal && (
              <div className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-2">Linked Department Goal</h2>
                  <div className="p-3 border border-blue-100 bg-blue-50 rounded-md">
                    <div className="flex items-start gap-2">
                      <LinkIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{linkedDepartmentGoal.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {linkedDepartmentGoal.departmentName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 w-full"
                    onClick={() => navigate(`/department-goals/${linkedDepartmentGoal.id}`)}
                  >
                    View Department Goal
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

export default EmployeeGoalDetail;
