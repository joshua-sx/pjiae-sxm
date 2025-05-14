
export interface FlaggedItem {
  id: string;
  type: 'goal' | 'appraisal';
  employeeId: string;
  employeeName: string;
  department: string;
  phase: 'goal-setting' | 'mid-year-review' | 'year-end-evaluation';
  itemTitle: string;
  flagReason: string;
  flagDate: string;
  flaggedBy: string;
  status: 'flagged' | 'resolved' | 'in-progress';
}

export const flaggedItems: FlaggedItem[] = [
  {
    id: "f1",
    type: "goal",
    employeeId: "e001",
    employeeName: "John Smith",
    department: "IT",
    phase: "goal-setting",
    itemTitle: "Improve ticket resolution time by 20%",
    flagReason: "This goal isn't specific enough. Need to define how the improvement will be measured.",
    flagDate: "2023-03-30",
    flaggedBy: "HR Manager",
    status: "flagged"
  },
  {
    id: "f2",
    type: "goal",
    employeeId: "e002",
    employeeName: "Jane Brown",
    department: "Security",
    phase: "goal-setting",
    itemTitle: "Implement new access control system",
    flagReason: "Timeline is unrealistic given the procurement process. Please revise the deadline.",
    flagDate: "2023-04-02",
    flaggedBy: "Department Director",
    status: "in-progress"
  },
  {
    id: "f3",
    type: "appraisal",
    employeeId: "e003",
    employeeName: "David Martinez",
    department: "Operations",
    phase: "mid-year-review",
    itemTitle: "Mid-Year Review",
    flagReason: "Rating does not match the documented achievements. Please provide more context for the low leadership score.",
    flagDate: "2023-07-20",
    flaggedBy: "HR Director",
    status: "flagged"
  },
  {
    id: "f4",
    type: "appraisal",
    employeeId: "e004",
    employeeName: "Emily Davis",
    department: "Human Resources",
    phase: "year-end-evaluation",
    itemTitle: "Year-End Evaluation",
    flagReason: "Missing documentation for training completion claims.",
    flagDate: "2023-11-28",
    flaggedBy: "HR Manager",
    status: "resolved"
  },
  {
    id: "f5",
    type: "goal",
    employeeId: "e005",
    employeeName: "Michael Brown",
    department: "IT",
    phase: "goal-setting",
    itemTitle: "Complete server infrastructure upgrade",
    flagReason: "Budget allocation is unclear. Please specify funding source for this initiative.",
    flagDate: "2023-03-15",
    flaggedBy: "Finance Director",
    status: "resolved"
  }
];
