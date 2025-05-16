
import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Loading from "./components/Loading";

// Create a centralized lazy loading function to handle potential import errors
const lazyLoad = (pageName: string) => {
  return lazy(() => 
    import('./pages/index')
      .then(module => ({ default: module[pageName] }))
      .catch(error => {
        console.error(`Error loading ${pageName}:`, error);
        return { default: () => <div>Failed to load {pageName}</div> };
      })
  );
};

// Core pages - Lazy loaded with error handling
const Index = lazyLoad('IndexPage');
const Login = lazyLoad('LoginPage');
const NotFound = lazyLoad('NotFoundPage');
const Help = lazyLoad('HelpPage');

// Appraisal pages - Lazy loaded
const MyAppraisals = lazyLoad('MyAppraisalsPage');
const AppraisalDetail = lazyLoad('AppraisalDetailPage');
const PendingForms = lazyLoad('PendingFormsPage');
const FlaggedItems = lazyLoad('FlaggedItemsPage');
const MidYearReviews = lazyLoad('MidYearReviewsPage');
const FinalAssessments = lazyLoad('FinalAssessmentsPage');

// Organization/Users - Lazy loaded
const Organization = lazyLoad('OrganizationPage');
const EmployeeDetail = lazyLoad('EmployeeDetailPage');
const AppraiserAssignment = lazyLoad('AppraiserAssignmentPage');
const UserList = lazyLoad('UserListPage');
const RoleAssignment = lazyLoad('RoleAssignmentPage');
const AccessLogs = lazyLoad('AccessLogsPage');

// Goal management pages - Lazy loaded
const Goals = lazyLoad('GoalsPage');
const DivisionGoals = lazyLoad('DivisionGoalsPage');
const EmployeeGoals = lazyLoad('EmployeeGoalsPage');
const DepartmentGoalDetail = lazyLoad('DepartmentGoalDetailPage');
const DepartmentGoalForm = lazyLoad('DepartmentGoalFormPage');
const EmployeeGoalDetail = lazyLoad('EmployeeGoalDetailPage');
const HRGoalsDashboard = lazyLoad('HRGoalsDashboardPage');

// Reports and Analytics - Lazy loaded
const Reports = lazyLoad('ReportsPage');
const GoalsAnalytics = lazyLoad('GoalsAnalyticsPage');
const MidYearReports = lazyLoad('MidYearReportsPage');
const FinalAssessmentReports = lazyLoad('FinalAssessmentReportsPage');
const SystemUsageReports = lazyLoad('SystemUsageReportsPage');
const ErrorPerformanceMetrics = lazyLoad('ErrorPerformanceMetricsPage');

// Settings pages - Lazy loaded
const CycleSettings = lazyLoad('CycleSettingsPage');
const Profile = lazyLoad('ProfilePage');
const ChangePassword = lazyLoad('ChangePasswordPage');
const ProfileSecurity = lazyLoad('ProfileSecurityPage');
const AppSettings = lazyLoad('AppSettingsPage');
const BackupRestore = lazyLoad('BackupRestorePage');
const CICDConfiguration = lazyLoad('CICDConfigurationPage');

// IT Admin pages - Lazy loaded
const SystemHealth = lazyLoad('SystemHealthPage');

// Audit logs - Lazy loaded
const AuditLogs = lazyLoad('AuditLogsPage');

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
