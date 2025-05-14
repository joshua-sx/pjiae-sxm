
import { GoalStatus } from '@/types/goals';

export type UnifiedGoal = {
  id: string;
  employeeName: string;
  departmentName: string;
  title: string;
  status: GoalStatus;
  createdBy: string;
  creatorRole: string;
  type: 'employee' | 'department';
  createdAt: Date;
};
