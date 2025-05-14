
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { mockAppraisals } from '@/data/mockAppraisals';
import { PendingAppraisal } from '@/types/pendingAppraisal';

// Shape the mock data into what we need for this view
const pendingAppraisalData: PendingAppraisal[] = mockAppraisals
  .filter(appraisal => appraisal.status === 'submitted' || appraisal.status === 'flagged')
  .map(appraisal => ({
    id: appraisal.id,
    employeeName: appraisal.employeeName,
    departmentName: appraisal.department,
    phase: appraisal.phase,
    status: appraisal.status,
    submittedDate: new Date(appraisal.submittedDate),
  }));

export const usePendingAppraisals = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [commentText, setCommentText] = useState('');
  const [selectedAppraisal, setSelectedAppraisal] = useState<PendingAppraisal | null>(null);
  const [reviewAction, setReviewAction] = useState<'approve' | 'flag' | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Extract unique departments and phases for filters
  const departments = ['all', ...new Set(pendingAppraisalData.map(a => a.departmentName))];
  const phases = ['all', ...new Set(pendingAppraisalData.map(a => a.phase))];

  // Apply filters
  const filteredAppraisals = pendingAppraisalData.filter(appraisal => {
    const matchesSearch = 
      appraisal.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appraisal.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || appraisal.departmentName === departmentFilter;
    const matchesPhase = phaseFilter === 'all' || appraisal.phase === phaseFilter;
    
    return matchesSearch && matchesDepartment && matchesPhase;
  });

  const handleReviewClick = useCallback((appraisal: PendingAppraisal, action: 'approve' | 'flag') => {
    setSelectedAppraisal(appraisal);
    setReviewAction(action);
    setCommentText('');
    setIsDialogOpen(true);
  }, []);

  const handleSubmitReview = useCallback(() => {
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
  }, [selectedAppraisal, reviewAction, toast]);

  return {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    phaseFilter,
    setPhaseFilter,
    commentText,
    setCommentText,
    selectedAppraisal,
    reviewAction,
    isDialogOpen,
    setIsDialogOpen,
    filteredAppraisals,
    departments,
    phases,
    handleReviewClick,
    handleSubmitReview
  };
};
