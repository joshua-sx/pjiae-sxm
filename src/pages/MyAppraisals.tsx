
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppraisalCard from "@/components/appraisal/AppraisalCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data
const mockMyAppraisals = [
  {
    id: "1",
    title: "Goal Setting 2023",
    status: "completed" as const,
    cycle: "Q1 2023",
    dueDate: "2023-01-31",
  },
  {
    id: "2",
    title: "Mid-Year Review 2023",
    status: "completed" as const,
    cycle: "Q2 2023",
    dueDate: "2023-06-30",
  },
  {
    id: "3",
    title: "Year-End Evaluation 2023",
    status: "pending" as const,
    cycle: "Q4 2023",
    dueDate: "2023-11-30",
  },
];

const mockTeamAppraisals = [
  {
    id: "4",
    title: "Goal Setting",
    status: "flagged" as const,
    cycle: "Q1 2023",
    dueDate: "2023-01-31",
    employeeName: "John Smith",
  },
  {
    id: "5",
    title: "Mid-Year Review",
    status: "completed" as const,
    cycle: "Q2 2023",
    dueDate: "2023-06-30",
    employeeName: "Sarah Johnson",
  },
  {
    id: "6",
    title: "Year-End Evaluation",
    status: "approved" as const,
    cycle: "Q4 2023",
    dueDate: "2023-11-30",
    employeeName: "Michael Brown",
  },
  {
    id: "7",
    title: "Year-End Evaluation",
    status: "appealed" as const,
    cycle: "Q4 2023",
    dueDate: "2023-11-30",
    employeeName: "David Wilson",
  },
];

const MyAppraisals = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1>Appraisals</h1>
          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search appraisals..."
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="my" className="w-full">
          <TabsList>
            <TabsTrigger value="my">My Appraisals</TabsTrigger>
            <TabsTrigger value="team">Team Appraisals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMyAppraisals.map((appraisal) => (
                <AppraisalCard
                  key={appraisal.id}
                  id={appraisal.id}
                  title={appraisal.title}
                  status={appraisal.status}
                  cycle={appraisal.cycle}
                  dueDate={appraisal.dueDate}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTeamAppraisals.map((appraisal) => (
                <AppraisalCard
                  key={appraisal.id}
                  id={appraisal.id}
                  title={appraisal.title}
                  status={appraisal.status}
                  cycle={appraisal.cycle}
                  dueDate={appraisal.dueDate}
                  employeeName={appraisal.employeeName}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MyAppraisals;
