
import { AppraisalStatus } from '@/types/appraisal';

export type PendingAppraisal = {
  id: string;
  employeeName: string;
  departmentName: string;
  phase: string;
  status: AppraisalStatus;
  submittedDate: Date;
};
