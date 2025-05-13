import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { StatusIndicator } from "@/components/organization/StatusIndicator";
import { RatingDisplay } from "@/components/organization/RatingDisplay";
import { EmployeeData } from "@/types/organization";

// Mock employee data
const mockEmployees: EmployeeData[] = [
  {
    id: "1",
    name: "John Doe",
    department: "Airport Operations",
    jobTitle: "Operations Manager",
    midYearStatus: "completed",
    midYearRating: 4.5,
    endYearStatus: "completed", 
    endYearRating: 4.2,
  },
  {
    id: "2",
    name: "Jane Smith",
    department: "Human Resources",
    jobTitle: "HR Specialist",
    midYearStatus: "completed",
    midYearRating: 3.8,
    endYearStatus: "not-started",
    endYearRating: null,
  },
  {
    id: "3",
    name: "Michael Brown",
    department: "Information Technology",
    jobTitle: "IT Manager",
    midYearStatus: "completed",
    midYearRating: 4.7,
    endYearStatus: "completed",
    endYearRating: 4.8,
  },
  {
    id: "4",
    name: "Sarah Johnson",
    department: "Finance",
    jobTitle: "Financial Analyst",
    midYearStatus: "not-started",
    midYearRating: null,
    endYearStatus: "not-started",
    endYearRating: null,
  },
  {
    id: "5",
    name: "Robert Wilson",
    department: "Security",
    jobTitle: "Security Supervisor",
    midYearStatus: "completed",
    midYearRating: 3.5,
    endYearStatus: "not-started",
    endYearRating: null,
  },
  {
    id: "6",
    name: "Emily Davis",
    department: "Customer Service",
    jobTitle: "Customer Service Manager",
    midYearStatus: "completed",
    midYearRating: 4.9,
    endYearStatus: "completed",
    endYearRating: 4.7,
  },
  {
    id: "7",
    name: "David Martinez",
    department: "Maintenance",
    jobTitle: "Maintenance Technician",
    midYearStatus: "not-started",
    midYearRating: null,
    endYearStatus: "not-started",
    endYearRating: null,
  },
  {
    id: "8",
    name: "Lisa Thompson",
    department: "Airport Operations",
    jobTitle: "Operations Coordinator",
    midYearStatus: "completed",
    midYearRating: 4.0,
    endYearStatus: "completed",
    endYearRating: 3.8,
  },
];

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employee = mockEmployees.find(emp => emp.id === id);
  
  if (!employee) {
    return (
      <MainLayout>
        <div className="p-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/organization')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Organization
          </Button>
          <h1>Employee Not Found</h1>
          <p>The requested employee information could not be found.</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/organization')}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="mb-0">{employee.name}</h1>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Employee Information</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <div className="text-sm text-gray-500">Department</div>
                    <div>{employee.department}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Job Title</div>
                    <div>{employee.jobTitle}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Employee ID</div>
                    <div>{employee.id}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Appraisal Status</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Mid-Year Review</div>
                    <div className="flex items-center justify-between">
                      <StatusIndicator status={employee.midYearStatus} />
                      {employee.midYearStatus === "completed" && (
                        <div className="text-right">
                          <RatingDisplay rating={employee.midYearRating} />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">End-Year Review</div>
                    <div className="flex items-center justify-between">
                      <StatusIndicator status={employee.endYearStatus} />
                      {employee.endYearStatus === "completed" && (
                        <div className="text-right">
                          <RatingDisplay rating={employee.endYearRating} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Recent Appraisals</h3>
              <div className="text-center text-gray-500 py-8">
                This is a simplified view. In a complete implementation, 
                this section would show a list of all appraisals for this employee.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EmployeeDetail;
