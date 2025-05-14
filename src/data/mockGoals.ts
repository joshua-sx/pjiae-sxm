
import { DepartmentGoal, EmployeeGoal, GoalStatus } from "@/types/goals";

export const mockDepartmentGoals: DepartmentGoal[] = [
  {
    id: "dept-goal-1",
    title: "Increase Customer Satisfaction",
    description: "Improve overall customer experience and satisfaction ratings across all service touchpoints",
    smartCriteria: {
      specific: "Focus on improving customer service at check-in, security, and boarding areas",
      measurable: "Increase customer satisfaction survey scores by 15%",
      achievable: "Implement staff training and service improvements",
      relevant: "Aligns with our strategic objective to enhance passenger experience",
      timeBound: "Complete by end of Q4 2025"
    },
    status: "approved",
    createdBy: "dir-001",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-20"),
    deadline: new Date("2025-12-31"),
    departmentId: "dept-001",
    departmentName: "Customer Service",
    assignedEmployeeGoals: ["emp-goal-1", "emp-goal-2"],
    comments: [
      {
        id: "comment-1",
        goalId: "dept-goal-1",
        authorId: "hr-001",
        authorName: "Jane Smith",
        authorRole: "HR Officer",
        content: "Approved. Please ensure all team supervisors are informed.",
        createdAt: new Date("2025-01-20"),
        isFlag: false
      }
    ]
  },
  {
    id: "dept-goal-2",
    title: "Optimize Operational Efficiency",
    description: "Streamline airport operations to reduce delays and improve resource utilization",
    smartCriteria: {
      specific: "Reduce aircraft turnaround times and baggage handling delays",
      measurable: "Decrease average turnaround time by 10 minutes and reduce mishandled baggage by 25%",
      achievable: "Implement new baggage tracking system and staff scheduling optimization",
      relevant: "Directly impacts our operational KPIs and passenger satisfaction",
      timeBound: "Implement by end of Q3 2025"
    },
    status: "flagged",
    createdBy: "dir-002",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-18"),
    deadline: new Date("2025-09-30"),
    departmentId: "dept-002",
    departmentName: "Operations",
    assignedEmployeeGoals: [],
    comments: [
      {
        id: "comment-2",
        goalId: "dept-goal-2",
        authorId: "hr-001",
        authorName: "Jane Smith",
        authorRole: "HR Officer",
        content: "The 25% reduction in mishandled baggage may be too ambitious. Please review industry benchmarks and adjust.",
        createdAt: new Date("2025-01-18"),
        isFlag: true
      }
    ]
  },
  {
    id: "dept-goal-3",
    title: "Enhance Security Protocols",
    description: "Strengthen airport security measures while maintaining efficient passenger flow",
    smartCriteria: {
      specific: "Update security screening procedures and implement new technology",
      measurable: "Meet 100% compliance with new regulations while maintaining current throughput rates",
      achievable: "Acquire new screening equipment and train staff",
      relevant: "Critical for airport safety and regulatory compliance",
      timeBound: "Complete by end of Q2 2025"
    },
    status: "submitted",
    createdBy: "dir-003",
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05"),
    deadline: null,
    departmentId: "dept-003",
    departmentName: "Security",
    assignedEmployeeGoals: [],
    comments: []
  }
];

export const mockEmployeeGoals: EmployeeGoal[] = [
  {
    id: "emp-goal-1",
    title: "Improve Check-in Efficiency",
    description: "Reduce passenger check-in times while maintaining service quality",
    smartCriteria: {
      specific: "Optimize check-in process for both standard and premium passengers",
      measurable: "Reduce average check-in time by 20% from 3.5 minutes to 2.8 minutes per passenger",
      achievable: "Implement new check-in procedures and provide staff training",
      relevant: "Directly contributes to department goal of improving customer satisfaction",
      timeBound: "Implement within 3 months and maintain throughout 2025"
    },
    status: "in-progress",
    createdBy: "sup-001",
    createdAt: new Date("2025-01-25"),
    updatedAt: new Date("2025-02-01"),
    deadline: new Date("2025-04-30"),
    employeeId: "emp-001",
    employeeName: "John Doe",
    supervisorId: "sup-001",
    linkedDepartmentGoalId: "dept-goal-1",
    progress: 30,
    comments: [
      {
        id: "comment-3",
        goalId: "emp-goal-1",
        authorId: "sup-001",
        authorName: "Michael Johnson",
        authorRole: "Supervisor",
        content: "Good progress so far. Consider focusing on premium passenger lane optimization next.",
        createdAt: new Date("2025-02-15"),
        isFlag: false
      }
    ]
  },
  {
    id: "emp-goal-2",
    title: "Enhance Boarding Experience",
    description: "Improve the boarding process to reduce boarding time and increase passenger satisfaction",
    smartCriteria: {
      specific: "Redesign boarding sequence and gate announcements",
      measurable: "Reduce boarding time by 15% and increase related satisfaction scores by 20%",
      achievable: "Implement new boarding procedures and train gate agents",
      relevant: "Supports department goal of improving overall customer experience",
      timeBound: "Complete implementation by Q2 2025"
    },
    status: "approved",
    createdBy: "sup-002",
    createdAt: new Date("2025-01-28"),
    updatedAt: new Date("2025-01-30"),
    deadline: new Date("2025-06-30"),
    employeeId: "emp-002",
    employeeName: "Sarah Wilson",
    supervisorId: "sup-002",
    linkedDepartmentGoalId: "dept-goal-1",
    progress: 0,
    comments: []
  }
];
