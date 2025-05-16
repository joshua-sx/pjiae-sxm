
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Check, XCircle } from 'lucide-react';

const AppraisalDetailDirector = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [comments, setComments] = useState('');
  const [isRequiringChanges, setIsRequiringChanges] = useState(false);
  
  // Mock appraisal data
  const appraisal = {
    id,
    employeeName: 'John Smith',
    formType: 'Mid-Year Review',
    submissionDate: '2023-06-15',
    status: 'Pending Review',
    content: {
      accomplishments: 'Successfully completed Project X ahead of schedule.',
      challenges: 'Faced technical difficulties with the new system.',
      nextSteps: 'Focus on improving communication with stakeholders.',
      ratings: {
        communication: 4,
        teamwork: 5,
        technical: 4,
        leadership: 3
      }
    }
  };
  
  const handleApprove = () => {
    toast({
      title: 'Appraisal approved',
      description: comments ? 'Your comments have been recorded.' : '',
      variant: 'success',
    });
  };
  
  const handleRequestChanges = () => {
    if (isRequiringChanges && !comments) {
      toast({
        title: 'Comments required',
        description: 'Please provide comments on what changes are needed.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Changes requested',
      description: 'The appraisal has been sent back for revisions.',
      variant: 'success',
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Appraisal Review</h1>
            <p className="text-muted-foreground mt-2">
              {appraisal.employeeName} - {appraisal.formType}
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Appraisal Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Accomplishments</h3>
              <p className="mt-1">{appraisal.content.accomplishments}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Challenges</h3>
              <p className="mt-1">{appraisal.content.challenges}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Next Steps</h3>
              <p className="mt-1">{appraisal.content.nextSteps}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Performance Ratings</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Communication</p>
                  <p className="font-semibold">{appraisal.content.ratings.communication}/5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teamwork</p>
                  <p className="font-semibold">{appraisal.content.ratings.teamwork}/5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Technical Skills</p>
                  <p className="font-semibold">{appraisal.content.ratings.technical}/5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Leadership</p>
                  <p className="font-semibold">{appraisal.content.ratings.leadership}/5</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Director Sign-off</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Comments (optional unless requesting changes)</label>
              <Textarea 
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter any comments or feedback..."
                className="resize-none"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsRequiringChanges(true)}
                onBlur={handleRequestChanges}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Request Changes
              </Button>
              <Button onClick={handleApprove}>
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AppraisalDetailDirector;
