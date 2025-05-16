
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@/components/ui/table';

// Mock appraisals for director view
const mockAppraisals = [
  {
    id: '1',
    employeeName: 'John Smith',
    formType: 'Mid-Year Review',
    submissionDate: '2023-06-15',
    status: 'Pending Review',
  },
  {
    id: '2',
    employeeName: 'Jane Doe',
    formType: 'Final Assessment',
    submissionDate: '2023-12-01',
    status: 'Pending Review',
  },
  {
    id: '3',
    employeeName: 'Mark Johnson',
    formType: 'Mid-Year Review',
    submissionDate: '2023-06-10',
    status: 'Pending Review',
  }
];

const AppraisalOversight = () => {
  const { toast } = useToast();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Appraisal Oversight</h1>
            <p className="text-muted-foreground mt-2">Review and approve appraisals from your direct reports' teams</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submitted Appraisals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Form Type</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAppraisals.map((appraisal) => (
                  <TableRow key={appraisal.id}>
                    <TableCell>{appraisal.employeeName}</TableCell>
                    <TableCell>{appraisal.formType}</TableCell>
                    <TableCell>{appraisal.submissionDate}</TableCell>
                    <TableCell>{appraisal.status}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={`/director/appraisals/${appraisal.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {mockAppraisals.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No appraisals pending review.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AppraisalOversight;
