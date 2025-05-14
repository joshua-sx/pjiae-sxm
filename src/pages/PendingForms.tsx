
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import PendingAppraisalFilters from '@/components/appraisal/PendingAppraisalFilters';
import PendingAppraisalTable from '@/components/appraisal/PendingAppraisalTable';
import AppraisalReviewDialog from '@/components/appraisal/AppraisalReviewDialog';
import { usePendingAppraisals } from '@/hooks/usePendingAppraisals';

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
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pending Appraisals</h1>
        </div>
        
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
