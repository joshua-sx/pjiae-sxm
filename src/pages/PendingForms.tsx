import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import StatusBadge from '@/components/appraisal/StatusBadge';
import { AppraisalStatus } from '@/types/appraisal';
import { mockAppraisals } from '@/data/mockAppraisals';

// A subset of the full appraisal type focused on what's needed for this page
type PendingAppraisal = {
  id: string;
  employeeName: string;
  departmentName: string;
  phase: string;
  status: AppraisalStatus;
  submittedDate: Date;
};

// Shape the mock data into what we need for this view
const pendingAppraisals: PendingAppraisal[] = mockAppraisals
  .filter(appraisal => appraisal.status === 'submitted' || appraisal.status === 'flagged')
  .map(appraisal => ({
    id: appraisal.id,
    employeeName: appraisal.employeeName,
    departmentName: appraisal.department, // Changed from departmentName to department
    phase: appraisal.phase,
    status: appraisal.status,
    submittedDate: new Date(appraisal.submittedDate),
  }));

const PendingForms = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [commentText, setCommentText] = useState('');
  const [selectedAppraisal, setSelectedAppraisal] = useState<PendingAppraisal | null>(null);
  const [reviewAction, setReviewAction] = useState<'approve' | 'flag' | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Extract unique departments and phases for filters
  const departments = ['all', ...new Set(pendingAppraisals.map(a => a.departmentName))];
  const phases = ['all', ...new Set(pendingAppraisals.map(a => a.phase))];

  // Apply filters
  const filteredAppraisals = pendingAppraisals.filter(appraisal => {
    const matchesSearch = 
      appraisal.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appraisal.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || appraisal.departmentName === departmentFilter;
    const matchesPhase = phaseFilter === 'all' || appraisal.phase === phaseFilter;
    
    return matchesSearch && matchesDepartment && matchesPhase;
  });

  const handleReviewClick = (appraisal: PendingAppraisal, action: 'approve' | 'flag') => {
    setSelectedAppraisal(appraisal);
    setReviewAction(action);
    setCommentText('');
    setIsDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (!selectedAppraisal || !reviewAction) return;
    
    let title = '';
    let description = '';
    
    if (reviewAction === 'approve') {
      title = 'Appraisal Approved';
      description = `The appraisal for ${selectedAppraisal.employeeName} has been approved.`;
    } else {
      title = 'Appraisal Flagged';
      description = `The appraisal for ${selectedAppraisal.employeeName} has been flagged for revision.`;
    }
    
    toast({
      title,
      description,
    });
    
    setIsDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pending Appraisals</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by employee or department..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={departmentFilter} 
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={phaseFilter} 
              onValueChange={setPhaseFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by phase" />
              </SelectTrigger>
              <SelectContent>
                {phases.map((phase) => (
                  <SelectItem key={phase} value={phase}>
                    {phase === 'all' ? 'All Phases' : phase}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredAppraisals.length > 0 ? (
          <Table>
            <TableCaption>A list of pending appraisals requiring action.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppraisals.map((appraisal) => (
                <TableRow key={appraisal.id}>
                  <TableCell className="font-medium">
                    {appraisal.employeeName}
                  </TableCell>
                  <TableCell>{appraisal.departmentName}</TableCell>
                  <TableCell>{appraisal.phase}</TableCell>
                  <TableCell>
                    <StatusBadge status={appraisal.status} />
                  </TableCell>
                  <TableCell>
                    {appraisal.submittedDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReviewClick(appraisal, 'approve')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReviewClick(appraisal, 'flag')}
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Flag
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-muted-foreground">
              No pending appraisals found matching your filters.
            </p>
          </div>
        )}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewAction === 'approve' ? 'Approve Appraisal' : 'Flag Appraisal'}
            </DialogTitle>
            <DialogDescription>
              {reviewAction === 'approve' 
                ? 'Confirm approval of this appraisal submission.' 
                : 'Provide feedback on why this appraisal needs revision.'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppraisal && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm font-medium mb-1">Employee</p>
                <p className="text-sm">{selectedAppraisal.employeeName}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Department</p>
                <p className="text-sm">{selectedAppraisal.departmentName}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Phase</p>
                <p className="text-sm">{selectedAppraisal.phase}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">
                  {reviewAction === 'approve' ? 'Comment (Optional)' : 'Feedback for Revision (Required)'}
                </p>
                <Textarea
                  placeholder={reviewAction === 'approve' 
                    ? "Add any comments about this approval..." 
                    : "Explain what needs to be revised..."}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[120px]"
                  required={reviewAction === 'flag'}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <XCircle className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReview}
              disabled={reviewAction === 'flag' && !commentText.trim()}
              className={reviewAction === 'approve' ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"}
            >
              {reviewAction === 'approve' ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Confirm Approval
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Flag for Revision
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default PendingForms;
