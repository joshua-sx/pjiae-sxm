import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Loading from "./components/Loading";

// Core pages - Lazy loaded
const Index = React.lazy(() => import("./pages/index")); // Changed from Index.tsx to index
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Help = React.lazy(() => import("./pages/Help"));

// Appraisal pages - Lazy loaded
const MyAppraisals = React.lazy(() => import("./pages/MyAppraisals"));
const AppraisalDetail = React.lazy(() => import("./pages/AppraisalDetail"));
const PendingForms = React.lazy(() => import("./pages/PendingForms"));
const FlaggedItems = React.lazy(() => import("./pages/FlaggedItems"));
const MidYearReviews = React.lazy(() => import("./pages/MidYearReviews"));
const FinalAssessments = React.lazy(() => import("./pages/FinalAssessments"));

// Organization/Users - Lazy loaded
const Organization = React.lazy(() => import("./pages/Organization"));
const EmployeeDetail = React.lazy(() => import("./pages/EmployeeDetail"));
const AppraiserAssignment = React.lazy(() => import("./pages/AppraiserAssignment"));
const UserList = React.lazy(() => import("./pages/UserList"));
const RoleAssignment = React.lazy(() => import("./pages/RoleAssignment"));
const AccessLogs = React.lazy(() => import("./pages/AccessLogs"));

// Goal management pages - Lazy loaded
const Goals = React.lazy(() => import("./pages/Goals"));
const DivisionGoals = React.lazy(() => import("./pages/DivisionGoals"));
const EmployeeGoals = React.lazy(() => import("./pages/EmployeeGoals"));
const DepartmentGoalDetail = React.lazy(() => import("./pages/DepartmentGoalDetail"));
const DepartmentGoalForm = React.lazy(() => import("./pages/DepartmentGoalForm"));
const EmployeeGoalDetail = React.lazy(() => import("./pages/EmployeeGoalDetail"));
const HRGoalsDashboard = React.lazy(() => import("./pages/HRGoalsDashboard"));

// Reports and Analytics - Lazy loaded
const Reports = React.lazy(() => import("./pages/Reports"));
const GoalsAnalytics = React.lazy(() => import("./pages/GoalsAnalytics"));
const MidYearReports = React.lazy(() => import("./pages/MidYearReports"));
const FinalAssessmentReports = React.lazy(() => import("./pages/FinalAssessmentReports"));
const SystemUsageReports = React.lazy(() => import("./pages/SystemUsageReports"));
const ErrorPerformanceMetrics = React.lazy(() => import("./pages/ErrorPerformanceMetrics"));

// Settings pages - Lazy loaded
const CycleSettings = React.lazy(() => import("./pages/CycleSettings"));
const Profile = React.lazy(() => import("./pages/Profile"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const ProfileSecurity = React.lazy(() => import("./pages/ProfileSecurity"));
const AppSettings = React.lazy(() => import("./pages/AppSettings"));
const BackupRestore = React.lazy(() => import("./pages/BackupRestore"));
const CICDConfiguration = React.lazy(() => import("./pages/CICDConfiguration"));

// IT Admin pages - Lazy loaded
const SystemHealth = React.lazy(() => import("./pages/SystemHealth"));

// Audit logs - Lazy loaded
const AuditLogs = React.lazy(() => import("./pages/AuditLogs"));

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
              <Route 
                path="/login" 
                element={
                  <Suspense fallback={<Loading />}>
                    <Login />
                  </Suspense>
                } 
              />
              <Route 
                path="/" 
                element={
                  <Suspense fallback={<Loading />}>
                    <Index />
                  </Suspense>
                } 
              />
              <Route 
                path="/help" 
                element={
                  <Suspense fallback={<Loading />}>
                    <Help />
                  </Suspense>
                } 
              />
              
              {/* Appraisals */}
              <Route 
                path="/my-appraisals" 
                element={
                  <Suspense fallback={<Loading />}>
                    <MyAppraisals />
                  </Suspense>
                } 
              />
              <Route 
                path="/appraisal/:id" 
                element={
                  <Suspense fallback={<Loading />}>
                    <AppraisalDetail />
                  </Suspense>
                } 
              />
              <Route 
                path="/pending-forms" 
                element={
                  <Suspense fallback={<Loading />}>
                    <PendingForms />
                  </Suspense>
                } 
              />
              <Route 
                path="/flagged-items" 
                element={
                  <Suspense fallback={<Loading />}>
                    <FlaggedItems />
                  </Suspense>
                } 
              />
              <Route 
                path="/mid-year-reviews" 
                element={
                  <Suspense fallback={<Loading />}>
                    <MidYearReviews />
                  </Suspense>
                } 
              />
              <Route 
                path="/final-assessments" 
                element={
                  <Suspense fallback={<Loading />}>
                    <FinalAssessments />
                  </Suspense>
                } 
              />
              
              {/* User Management */}
              <Route 
                path="/organization" 
                element={
                  <Suspense fallback={<Loading />}>
                    <Organization />
                  </Suspense>
                } 
              />
              <Route 
                path="/employee/:id" 
                element={
                  <Suspense fallback={<Loading />}>
                    <EmployeeDetail />
                  </Suspense>
                } 
              />
              <Route 
                path="/appraiser-assignments" 
                element={
                  <Suspense fallback={<Loading />}>
                    <AppraiserAssignment />
                  </Suspense>
                } 
              />
              <Route 
                path="/user-list" 
                element={
                  <Suspense fallback={<Loading />}>
                    <UserList />
                  </Suspense>
                } 
              />
              <Route 
                path="/role-assignment" 
                element={
                  <Suspense fallback={<Loading />}>
                    <RoleAssignment />
                  </Suspense>
                } 
              />
              <Route 
                path="/access-logs" 
                element={
                  <Suspense fallback={<Loading />}>
                    <AccessLogs />
                  </Suspense>
                } 
              />
              
              {/* Goals */}
              <Route 
                path="/goals" 
                element={
                  <Suspense fallback={<Loading />}>
                    <Goals />
                  </Suspense>
                } 
              />
              <Route 
                path="/division-goals" 
                element={
                  <Suspense fallback={<Loading />}>
                    <DivisionGoals />
                  </Suspense>
                } 
              />
              <Route 
                path="/employee-goals" 
                element={
                  <Suspense fallback={<Loading />}>
                    <EmployeeGoals />
                  </Suspense>
                } 
              />
              <Route 
                path="/department-goals/:id" 
                element={
                  <Suspense fallback={<Loading />}>
                    <DepartmentGoalDetail />
                  </Suspense>
                } 
              />
              <Route 
                path="/department-goals/create" 
                element={
                  <Suspense fallback={<Loading />}>
                    <DepartmentGoalForm />
                  </Suspense>
                } 
              />
              <Route 
                path="/department-goals/edit/:id" 
                element={
                  <Suspense fallback={<Loading />}>
                    <DepartmentGoalForm />
                  </Suspense>
                } 
              />
              <Route 
                path="/employee-goals/:id" 
                element={
                  <Suspense fallback={<Loading />}>
                    <EmployeeGoalDetail />
                  </Suspense>
                } 
              />
              <Route 
                path="/hr-goals-dashboard" 
                element={
                  <Suspense fallback={<Loading />}>
                    <HRGoalsDashboard />
                  </Suspense>
                } 
              />
              
              {/* Reports and Analytics */}
              <Route 
                path="/reports" 
                element={
                  <Suspense fallback={<Loading />}>
                    <Reports />
                  </Suspense>
                } 
              />
              <Route 
                path="/goals-analytics" 
                element={
                  <Suspense fallback={<Loading />}>
                    <GoalsAnalytics />
                  </Suspense>
                } 
              />
              <Route 
                path="/mid-year-reports" 
                element={
                  <Suspense fallback={<Loading />}>
                    <MidYearReports />
                  </Suspense>
                } 
              />
              <Route 
                path="/final-assessment-reports" 
                element={
                  <Suspense fallback={<Loading />}>
                    <FinalAssessmentReports />
                  </Suspense>
                } 
              />
              <Route 
                path="/system-usage-reports" 
                element={
                  <Suspense fallback={<Loading />}>
                    <SystemUsageReports />
                  </Suspense>
                } 
              />
              <Route 
                path="/error-performance-metrics" 
                element={
                  <Suspense fallback={<Loading />}>
                    <ErrorPerformanceMetrics />
                  </Suspense>
                } 
              />
              
              {/* Settings */}
              <Route 
                path="/cycle-settings" 
                element={
                  <Suspense fallback={<Loading />}>
                    <CycleSettings />
                  </Suspense>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <Suspense fallback={<Loading />}>
                    <Profile />
                  </Suspense>
                } 
              />
              <Route 
                path="/change-password" 
                element={
                  <Suspense fallback={<Loading />}>
                    <ChangePassword />
                  </Suspense>
                } 
              />
              <Route 
                path="/profile-security" 
                element={
                  <Suspense fallback={<Loading />}>
                    <ProfileSecurity />
                  </Suspense>
                } 
              />
              <Route 
                path="/app-settings" 
                element={
                  <Suspense fallback={<Loading />}>
                    <AppSettings />
                  </Suspense>
                } 
              />
              <Route 
                path="/backup-restore" 
                element={
                  <Suspense fallback={<Loading />}>
                    <BackupRestore />
                  </Suspense>
                } 
              />
              <Route 
                path="/ci-cd-configuration" 
                element={
                  <Suspense fallback={<Loading />}>
                    <CICDConfiguration />
                  </Suspense>
                } 
              />
              
              {/* IT Admin */}
              <Route 
                path="/system-health" 
                element={
                  <Suspense fallback={<Loading />}>
                    <SystemHealth />
                  </Suspense>
                } 
              />
              
              {/* Audit Logs */}
              <Route 
                path="/audit-logs" 
                element={
                  <Suspense fallback={<Loading />}>
                    <AuditLogs />
                  </Suspense>
                } 
              />
              
              <Route 
                path="*" 
                element={
                  <Suspense fallback={<Loading />}>
                    <NotFound />
                  </Suspense>
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
