
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';
import { FinalReviewForm } from '@/components/manager/final-review/FinalReviewForm';

const ManagerFinalReview = () => {
  return (
    <MainLayout>
      <div className="page-wrapper">
        <PageHeader
          title="Final Year Assessment"
          subtitle="Complete your year-end self-assessment"
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Final Assessment Form</CardTitle>
          </CardHeader>
          <CardContent>
            <FinalReviewForm />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ManagerFinalReview;
