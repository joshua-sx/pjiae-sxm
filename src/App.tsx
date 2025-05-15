
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Core pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";

// Appraisal pages
import MyAppraisals from "./pages/MyAppraisals";
import AppraisalDetail from "./pages/AppraisalDetail";
import PendingForms from "./pages/PendingForms";
import FlaggedItems from "./pages/FlaggedItems";
import MidYearReviews from "./pages/MidYearReviews";
import FinalAssessments from "./pages/FinalAssessments";

// Organization/Users
import Organization from "./pages/Organization";
import EmployeeDetail from "./pages/EmployeeDetail";
import AppraiserAssignment from "./pages/AppraiserAssignment";
import UserList from "./pages/UserList";
import RoleAssignment from "./pages/RoleAssignment";
import AccessLogs from "./pages/AccessLogs";

// Goal management pages
import Goals from "./pages/Goals"; 
import DivisionGoals from "./pages/DivisionGoals";
import EmployeeGoals from "./pages/EmployeeGoals";
import DepartmentGoalDetail from "./pages/DepartmentGoalDetail";
import DepartmentGoalForm from "./pages/DepartmentGoalForm";
import EmployeeGoalDetail from "./pages/EmployeeGoalDetail";
import HRGoalsDashboard from "./pages/HRGoalsDashboard";

// Reports and Analytics
import Reports from "./pages/Reports";
import GoalsAnalytics from "./pages/GoalsAnalytics";
import MidYearReports from "./pages/MidYearReports";
import FinalAssessmentReports from "./pages/FinalAssessmentReports";
import SystemUsageReports from "./pages/SystemUsageReports";
import ErrorPerformanceMetrics from "./pages/ErrorPerformanceMetrics";

// Settings pages
import CycleSettings from "./pages/CycleSettings";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ProfileSecurity from "./pages/ProfileSecurity";
import AppSettings from "./pages/AppSettings";
import BackupRestore from "./pages/BackupRestore";
import CICDConfiguration from "./pages/CICDConfiguration";

// IT Admin pages
import SystemHealth from "./pages/SystemHealth";

// Audit logs
import AuditLogs from "./pages/AuditLogs";

// Initialize the query client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Index />} />
              <Route path="/help" element={<Help />} />
              
              {/* Appraisals */}
              <Route path="/my-appraisals" element={<MyAppraisals />} />
              <Route path="/appraisal/:id" element={<AppraisalDetail />} />
              <Route path="/pending-forms" element={<PendingForms />} />
              <Route path="/flagged-items" element={<FlaggedItems />} />
              <Route path="/mid-year-reviews" element={<MidYearReviews />} />
              <Route path="/final-assessments" element={<FinalAssessments />} />
              
              {/* User Management */}
              <Route path="/organization" element={<Organization />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/appraiser-assignments" element={<AppraiserAssignment />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/role-assignment" element={<RoleAssignment />} />
              <Route path="/access-logs" element={<AccessLogs />} />
              
              {/* Goals */}
              <Route path="/goals" element={<Goals />} />
              <Route path="/division-goals" element={<DivisionGoals />} />
              <Route path="/employee-goals" element={<EmployeeGoals />} />
              <Route path="/department-goals/:id" element={<DepartmentGoalDetail />} />
              <Route path="/department-goals/create" element={<DepartmentGoalForm />} />
              <Route path="/department-goals/edit/:id" element={<DepartmentGoalForm />} />
              <Route path="/employee-goals/:id" element={<EmployeeGoalDetail />} />
              <Route path="/hr-goals-dashboard" element={<HRGoalsDashboard />} />
              
              {/* Reports and Analytics */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/goals-analytics" element={<GoalsAnalytics />} />
              <Route path="/mid-year-reports" element={<MidYearReports />} />
              <Route path="/final-assessment-reports" element={<FinalAssessmentReports />} />
              <Route path="/system-usage-reports" element={<SystemUsageReports />} />
              <Route path="/error-performance-metrics" element={<ErrorPerformanceMetrics />} />
              
              {/* Settings */}
              <Route path="/cycle-settings" element={<CycleSettings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/profile-security" element={<ProfileSecurity />} />
              <Route path="/app-settings" element={<AppSettings />} />
              <Route path="/backup-restore" element={<BackupRestore />} />
              <Route path="/ci-cd-configuration" element={<CICDConfiguration />} />
              
              {/* IT Admin */}
              <Route path="/system-health" element={<SystemHealth />} />
              
              {/* Audit Logs */}
              <Route path="/audit-logs" element={<AuditLogs />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
