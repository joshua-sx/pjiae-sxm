
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from '@/components/appraisal/StatusBadge';
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Eye } from "lucide-react";
import { PendingAppraisal } from '@/types/pendingAppraisal';

interface PendingAppraisalTableProps {
  appraisals: PendingAppraisal[];
  onReviewClick: (appraisal: PendingAppraisal, action: 'approve' | 'flag') => void;
}

const PendingAppraisalTable = ({ appraisals, onReviewClick }: PendingAppraisalTableProps) => {
  return (
    <>
      {appraisals.length > 0 ? (
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
            {appraisals.map((appraisal) => (
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
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReviewClick(appraisal, 'approve')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReviewClick(appraisal, 'flag')}
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
    </>
  );
};

export default PendingAppraisalTable;
