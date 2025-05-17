
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { mockDepartmentGoals } from "@/data/mockGoals";
import MainLayout from "@/components/layouts/MainLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { HRGoalsSummaryStats } from "@/components/hr/dashboard/HRGoalsSummaryStats";
import { HRGoalsTabs } from "@/components/hr/dashboard/HRGoalsTabs";

const HRGoalsDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useAuth();
  
  // Redirect if not HR
  React.useEffect(() => {
    if (role !== "HR Officer") {
      toast({
        title: "Access Denied",
        description: "Only HR Officers can access this dashboard.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [role, navigate, toast]);

  // Filter goals by status
  const submittedGoals = mockDepartmentGoals.filter(g => g.status === "submitted");
  const flaggedGoals = mockDepartmentGoals.filter(g => g.status === "flagged");
  const approvedGoals = mockDepartmentGoals.filter(g => g.status === "approved");
  
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
        
        <HRGoalsSummaryStats
          submittedCount={submittedGoals.length}
          flaggedCount={flaggedGoals.length}
          approvedCount={approvedGoals.length}
        />
        
        <HRGoalsTabs
          submittedGoals={submittedGoals}
          flaggedGoals={flaggedGoals}
          approvedGoals={approvedGoals}
          onSetDeadline={handleSetDeadline}
          onViewGoal={handleViewGoal}
        />
      </div>
    </MainLayout>
  );
};

export default HRGoalsDashboard;
