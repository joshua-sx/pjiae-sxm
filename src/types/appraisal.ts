
import { StatusType } from "@/components/appraisal/StatusBadge";

export type AppraisalStatus = StatusType;

export interface AppraisalForm {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  phase: 'goal-setting' | 'mid-year-review' | 'year-end-evaluation';
  status: AppraisalStatus;
  submittedDate: string;
  goals?: Array<{
    id: string;
    title: string;
    description: string;
    progress?: number;
  }>;
  ratings?: {
    communication?: number;
    teamwork?: number;
    leadership?: number;
    technical?: number;
    overall?: number;
  };
  comments: Array<{
    id: string;
    author: string;
    role: string;
    text: string;
    date: string;
  }>;
}
