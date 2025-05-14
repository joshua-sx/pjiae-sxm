
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MyAppraisals from "./pages/MyAppraisals";
import AppraisalDetail from "./pages/AppraisalDetail";
import Organization from "./pages/Organization";
import EmployeeDetail from "./pages/EmployeeDetail";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

// Goal management pages
import DepartmentGoals from "./pages/DepartmentGoals";
import DepartmentGoalDetail from "./pages/DepartmentGoalDetail";
import DepartmentGoalForm from "./pages/DepartmentGoalForm";
import EmployeeGoals from "./pages/EmployeeGoals";
import EmployeeGoalDetail from "./pages/EmployeeGoalDetail";
import HRGoalsDashboard from "./pages/HRGoalsDashboard";
import CycleSettings from "./pages/CycleSettings";

// New pages implemented for HR management
import PendingForms from "./pages/PendingForms";
import FlaggedItems from "./pages/FlaggedItems";
import AppraiserAssignment from "./pages/AppraiserAssignment";

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
              
              {/* Appraisals */}
              <Route path="/my-appraisals" element={<MyAppraisals />} />
              <Route path="/team-appraisals" element={<MyAppraisals />} />
              <Route path="/appraisal/:id" element={<AppraisalDetail />} />
              <Route path="/pending-forms" element={<PendingForms />} />
              <Route path="/flagged-items" element={<FlaggedItems />} />
              <Route path="/goal-setting" element={<NotFound />} />
              <Route path="/mid-year-reviews" element={<NotFound />} />
              <Route path="/year-end-evaluations" element={<NotFound />} />
              <Route path="/improvement-plans" element={<NotFound />} />
              
              {/* Organization */}
              <Route path="/organization" element={<Organization />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/appraiser-assignments" element={<AppraiserAssignment />} />
              <Route path="/role-management" element={<NotFound />} />
              
              {/* Department Goal Routes */}
              <Route path="/department-goals" element={<DepartmentGoals />} />
              <Route path="/department-goals/:id" element={<DepartmentGoalDetail />} />
              <Route path="/department-goals/create" element={<DepartmentGoalForm />} />
              <Route path="/department-goals/edit/:id" element={<DepartmentGoalForm />} />
              
              {/* Employee Goal Routes */}
              <Route path="/employee-goals" element={<EmployeeGoals />} />
              <Route path="/employee-goals/:id" element={<EmployeeGoalDetail />} />
              
              {/* HR Dashboard */}
              <Route path="/hr-goals-dashboard" element={<HRGoalsDashboard />} />
              
              {/* Reporting */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/score-distribution" element={<NotFound />} />
              <Route path="/submission-progress" element={<NotFound />} />
              
              {/* Settings */}
              <Route path="/cycle-settings" element={<CycleSettings />} />
              
              {/* Notifications */}
              <Route path="/alerts" element={<NotFound />} />
              <Route path="/reminders" element={<NotFound />} />
              <Route path="/communication-history" element={<NotFound />} />
              
              {/* Profile & Settings */}
              <Route path="/profile" element={<NotFound />} />
              <Route path="/settings" element={<NotFound />} />
              <Route path="/cycle-configuration" element={<NotFound />} />
              <Route path="/permissions" element={<NotFound />} />
              <Route path="/document-uploads" element={<NotFound />} />
              <Route path="/system-preferences" element={<NotFound />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
