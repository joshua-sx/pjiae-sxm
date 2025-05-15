export type GoalStatus = 'submitted' | 'flagged' | 'approved';

export interface SmartCriteria {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  smartCriteria: SmartCriteria;
  status: GoalStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  comments: GoalComment[];
}

export interface DepartmentGoal extends Goal {
  departmentId: string;
  departmentName: string;
  assignedEmployeeGoals?: string[]; // IDs of linked employee goals
}

export interface EmployeeGoal extends Goal {
  employeeId: string;
  employeeName: string;
  supervisorId: string;
  linkedDepartmentGoalId?: string; // Optional link to department goal
  progress: number; // 0-100 percentage
}

export interface GoalComment {
  id: string;
  goalId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: Date;
  isFlag: boolean;
}
