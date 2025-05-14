
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
              <Route path="/my-appraisals" element={<MyAppraisals />} />
              <Route path="/team-appraisals" element={<MyAppraisals />} />
              <Route path="/appraisal/:id" element={<AppraisalDetail />} />
              <Route path="/organization" element={<Organization />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/reports" element={<Reports />} />
              
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
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
