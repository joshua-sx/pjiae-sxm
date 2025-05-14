
import { AppraisalForm } from "@/types/appraisal";

// Mock data for appraisals
export const pendingAppraisals: AppraisalForm[] = [
  {
    id: "1",
    employeeId: "e001",
    employeeName: "John Smith",
    department: "IT",
    position: "Systems Engineer",
    phase: "goal-setting",
    status: "submitted",
    submittedDate: "2023-03-28",
    goals: [
      {
        id: "g1",
        title: "Improve ticket resolution time by 20%",
        description: "Implement new processes and tools to reduce average ticket resolution time from 24 hours to 19 hours."
      },
      {
        id: "g2",
        title: "Complete security certification",
        description: "Obtain CompTIA Security+ certification by end of Q2."
      }
    ],
    comments: [
      {
        id: "c1",
        author: "Sarah Brown",
        role: "IT Manager",
        text: "Goals are well defined but I'd like to see more specificity on how to measure the ticket resolution improvement.",
        date: "2023-03-29"
      }
    ]
  },
  {
    id: "2",
    employeeId: "e002",
    employeeName: "Jane Brown",
    department: "Security",
    position: "Security Officer",
    phase: "mid-year-review",
    status: "submitted",
    submittedDate: "2023-07-15",
    goals: [
      {
        id: "g3",
        title: "Complete security audit",
        description: "Perform quarterly security audits across all departments",
        progress: 75
      },
      {
        id: "g4",
        title: "Implement new access control system",
        description: "Roll out new access badges and readers across all facilities",
        progress: 90
      }
    ],
    ratings: {
      communication: 4.0,
      teamwork: 4.5,
      leadership: 3.5,
      technical: 4.5,
      overall: 4.2
    },
    comments: [
      {
        id: "c2",
        author: "Michael Wilson",
        role: "Security Director",
        text: "Jane has made excellent progress on her goals and demonstrates strong teamwork skills.",
        date: "2023-07-16"
      }
    ]
  },
  {
    id: "3",
    employeeId: "e003",
    employeeName: "David Martinez",
    department: "Operations",
    position: "Operations Coordinator",
    phase: "year-end-evaluation",
    status: "submitted",
    submittedDate: "2023-11-20",
    goals: [
      {
        id: "g5",
        title: "Improve operational efficiency",
        description: "Reduce process time by 15% through workflow optimization",
        progress: 100
      },
      {
        id: "g6",
        title: "Train staff on new procedures",
        description: "Complete training sessions for all team members on updated SOP",
        progress: 85
      }
    ],
    ratings: {
      communication: 3.5,
      teamwork: 4.0,
      leadership: 3.0,
      technical: 4.0,
      overall: 3.7
    },
    comments: [
      {
        id: "c3",
        author: "Robert Johnson",
        role: "Operations Manager",
        text: "David has met most of his goals for the year. I would like to see more leadership initiative in the coming year.",
        date: "2023-11-22"
      }
    ]
  },
  {
    id: "4",
    employeeId: "e004",
    employeeName: "Emily Davis",
    department: "Human Resources",
    position: "HR Specialist",
    phase: "goal-setting",
    status: "submitted",
    submittedDate: "2023-03-25",
    goals: [
      {
        id: "g7",
        title: "Implement new onboarding program",
        description: "Develop and launch enhanced onboarding experience for new hires"
      },
      {
        id: "g8",
        title: "Improve retention metrics",
        description: "Implement initiatives to improve employee retention by 10%"
      }
    ],
    comments: [
      {
        id: "c4",
        author: "Patricia White",
        role: "HR Director",
        text: "Well-thought-out goals. Please add more specific KPIs for measuring the retention improvement.",
        date: "2023-03-26"
      }
    ]
  },
  {
    id: "5",
    employeeId: "e005",
    employeeName: "Michael Brown",
    department: "IT",
    position: "IT Manager",
    phase: "year-end-evaluation",
    status: "submitted",
    submittedDate: "2023-11-22",
    goals: [
      {
        id: "g9",
        title: "Complete server infrastructure upgrade",
        description: "Migrate all servers to new cloud platform",
        progress: 95
      },
      {
        id: "g10",
        title: "Enhance cybersecurity protocols",
        description: "Implement multi-factor authentication across all systems",
        progress: 100
      }
    ],
    ratings: {
      communication: 4.5,
      teamwork: 4.0,
      leadership: 4.5,
      technical: 4.8,
      overall: 4.5
    },
    comments: [
      {
        id: "c5",
        author: "Jennifer Taylor",
        role: "CIO",
        text: "Michael has exceeded expectations this year. His leadership during the server migration was exemplary.",
        date: "2023-11-23"
      }
    ]
  }
];
