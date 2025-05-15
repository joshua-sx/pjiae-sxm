
import { GoalStatus } from '@/types/goals';

export type UnifiedGoal = {
  id: string;
  title: string;
  description: string;
  status: GoalStatus;
  createdBy: string;
  createdAt: Date;
  type: 'employee' | 'department';
  creatorName: string;
  creatorRole: string;
  department: string;
  departmentName: string;
  employeeName: string;
  progress?: number;
  linkedDepartmentGoalId?: string;
};
