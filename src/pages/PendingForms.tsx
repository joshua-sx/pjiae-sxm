
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/appraisal/StatusBadge";
import ReviewPanel from "@/components/appraisal/ReviewPanel";
import { Search } from "lucide-react";
import { AppraisalForm } from "@/types/appraisal";
import { pendingAppraisals } from "@/data/mockAppraisals";

const PendingForms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [selectedAppraisal, setSelectedAppraisal] = useState<AppraisalForm | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [appraisals, setAppraisals] = useState<AppraisalForm[]>(pendingAppraisals);
  
  // Extract unique departments for filtering
  const departments = ["all", ...Array.from(new Set(appraisals.map(a => a.department)))];
  
  // Phases for filtering
  const phases = [
    { value: "all", label: "All Phases" },
    { value: "goal-setting", label: "Goal Setting" },
    { value: "mid-year-review", label: "Mid-Year Review" },
    { value: "year-end-evaluation", label: "Year-End Evaluation" }
  ];
  
  // Filter appraisals based on search term and filters
  const filteredAppraisals = appraisals.filter(appraisal => {
    const matchesSearch = searchTerm === "" || 
      appraisal.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || appraisal.department === departmentFilter;
    
    const matchesPhase = phaseFilter === "all" || appraisal.phase === phaseFilter;
    
    return matchesSearch && matchesDepartment && matchesPhase;
  });
  
  // Handle opening the review panel
  const handleReviewClick = (appraisal: AppraisalForm) => {
    setSelectedAppraisal(appraisal);
    setIsReviewOpen(true);
  };
  
  // Handle approving an appraisal
  const handleApprove = (id: string) => {
    setAppraisals(appraisals.map(a => 
      a.id === id ? { ...a, status: "approved" as const } : a
    ));
    setIsReviewOpen(false);
  };
  
  // Handle rejecting an appraisal
  const handleReject = (id: string, comment: string) => {
    setAppraisals(appraisals.map(a => {
      if (a.id === id) {
        return { 
          ...a, 
          status: "rejected" as const,
          comments: [...a.comments, {
            id: `c${Date.now()}`,
            author: "HR Manager",
            role: "HR",
            text: comment,
            date: new Date().toISOString().split('T')[0]
          }]
        };
      }
      return a;
    }));
    setIsReviewOpen(false);
  };
  
  // Handle flagging an appraisal or goal
  const handleFlag = (id: string, goalId: string | null, reason: string) => {
    setAppraisals(appraisals.map(a => {
      if (a.id === id) {
        let updatedAppraisal = { 
          ...a,
          status: "flagged" as const,
          comments: [...a.comments, {
            id: `c${Date.now()}`,
            author: "HR Manager",
            role: "HR",
            text: `Flagged: ${reason}`,
            date: new Date().toISOString().split('T')[0]
          }]
        };
        
        // If a specific goal was flagged
        if (goalId && updatedAppraisal.goals) {
          updatedAppraisal.goals = updatedAppraisal.goals.map(g => 
            g.id === goalId ? { ...g, flagged: true } : g
          );
        }
        
        return updatedAppraisal;
      }
      return a;
    }));
    setIsReviewOpen(false);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1>Pending Appraisals</h1>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search employees or departments..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 pb-4">
          <div className="w-full md:w-1/3">
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.filter(d => d !== "all").map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/3">
            <Select
              value={phaseFilter}
              onValueChange={setPhaseFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by phase" />
              </SelectTrigger>
              <SelectContent>
                {phases.map((phase) => (
                  <SelectItem key={phase.value} value={phase.value}>
                    {phase.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppraisals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    No pending appraisals found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppraisals.map((appraisal) => (
                  <TableRow key={appraisal.id}>
                    <TableCell className="font-medium">{appraisal.employeeName}</TableCell>
                    <TableCell>{appraisal.department}</TableCell>
                    <TableCell>{appraisal.position}</TableCell>
                    <TableCell>
                      {appraisal.phase === "goal-setting" && "Goal Setting"}
                      {appraisal.phase === "mid-year-review" && "Mid-Year Review"}
                      {appraisal.phase === "year-end-evaluation" && "Year-End Evaluation"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={appraisal.status} />
                    </TableCell>
                    <TableCell>{appraisal.submittedDate}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReviewClick(appraisal)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-auto max-h-[90vh]">
          <ReviewPanel 
            appraisal={selectedAppraisal} 
            onClose={() => setIsReviewOpen(false)}
            onApprove={handleApprove}
            onReject={handleReject}
            onFlag={handleFlag}
            open={isReviewOpen}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default PendingForms;
