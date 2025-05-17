import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";
import { Bell, ChevronRight, Flag, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/appraisal/StatusBadge";

// Mock data - would come from API in real app
const mockStats = {
  pendingAppraisals: 5,
  completedAppraisals: 12,
  averageScore: 3.8,
  daysUntilDeadline: 14
};

const mockAppraisals = [
  {
    id: "1",
    title: "Department Goal Setting",
    status: "pending" as const,
    cycle: "Q1 2023",
    dueDate: "2023-01-31",
  },
  {
    id: "2",
    title: "Mid-Year Review",
    status: "approved" as const,
    cycle: "Q2 2023",
    dueDate: "2023-06-30",
  },
  {
    id: "3",
    title: "John Smith Appraisal",
    status: "flagged" as const,
    cycle: "Year-End 2023",
    dueDate: "2023-11-30",
    employeeName: "John Smith",
  },
  {
    id: "4",
    title: "Sarah Johnson Appraisal",
    status: "draft" as const,
    cycle: "Year-End 2023",
    dueDate: "2023-11-30",
    employeeName: "Sarah Johnson",
  }
];

const mockTasks = [
  { 
    id: "1", 
    title: "Planning Forms to Review", 
    count: 3, 
    type: "review",
    link: "/pending-forms"
  },
  { 
    id: "2", 
    title: "Flagged Goals", 
    count: 2, 
    type: "flag",
    link: "/flagged-items" 
  },
  { 
    id: "3", 
    title: "Missing Appraiser Assignments", 
    count: 4, 
    type: "assignment",
    link: "/appraiser-assignments" 
  },
];

const completionPercentage = 68; // Mock completion percentage

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="space-y-6 pt-4">
        <PageHeader 
          title="Dashboard"
          actions={
            <Button onClick={() => navigate("/my-appraisals")} className="w-full sm:w-auto">
              View All Appraisals
              <ChevronRight size={16} className="ml-1" />
            </Button>
          }
        />

        <Alert className="bg-pjiae-lightblue/10 border-pjiae-lightblue">
          <Bell className="h-4 w-4 text-pjiae-blue" />
          <AlertTitle>Current Cycle: Year-End 2023</AlertTitle>
          <AlertDescription>
            The Year-End appraisal cycle is now active. Please complete all evaluations by November 30, 2023.
          </AlertDescription>
        </Alert>

        <DashboardStats stats={mockStats} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <div className="col-span-full md:col-span-1 lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Your Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTasks.map((task) => (
                    <div 
                      key={task.id}
                      className={`flex justify-between items-center p-3 rounded-md border ${
                        task.type === 'flag' ? 'bg-red-50 border-red-100' :
                        task.type === 'review' ? 'bg-amber-50 border-amber-100' :
                        'bg-blue-50 border-blue-100'
                      }`}
                    >
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.count} items require attention</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate(task.link)}>
                        Review
                      </Button>
                    </div>
                  ))}
                  
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Current Cycle Completion</span>
                      <span className="text-sm font-medium">{completionPercentage}%</span>
                    </div>
                    <Progress value={completionPercentage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-full md:col-span-1 lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Appraisals</CardTitle>
                  <Button variant="link" size="sm" className="text-pjiae-blue" onClick={() => navigate("/my-appraisals")}>
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppraisals.slice(0, 3).map((appraisal) => (
                    <div 
                      key={appraisal.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-100"
                    >
                      <div>
                        <p className="font-medium">{appraisal.title}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>{appraisal.cycle}</span>
                          <span className="mx-1.5">•</span>
                          <span>{appraisal.employeeName || 'Self'}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3">
                          <StatusBadge status={appraisal.status} />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/appraisal/${appraisal.id}`)}>
                          <ChevronRight size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
