
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import PendingAppraisalFilters from '@/components/appraisal/PendingAppraisalFilters';
import PendingAppraisalTable from '@/components/appraisal/PendingAppraisalTable';
import AppraisalReviewDialog from '@/components/appraisal/AppraisalReviewDialog';
import { usePendingAppraisals } from '@/hooks/usePendingAppraisals';
import { PageHeader } from '@/components/common/PageHeader';

const PendingForms = () => {
  const {
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
  } = usePendingAppraisals();

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader 
          title="Pending Appraisals"
          subtitle="A list of pending appraisals requiring action."
        />
        
        <PendingAppraisalFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          departmentFilter={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          phaseFilter={phaseFilter}
          onPhaseChange={setPhaseFilter}
          departments={departments}
          phases={phases}
        />
        
        <PendingAppraisalTable
          appraisals={filteredAppraisals}
          onReviewClick={handleReviewClick}
        />
      </div>
      
      <AppraisalReviewDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedAppraisal={selectedAppraisal}
        reviewAction={reviewAction}
        commentText={commentText}
        onCommentChange={setCommentText}
        onSubmit={handleSubmitReview}
      />
    </MainLayout>
  );
};

export default PendingForms;
