
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
  },
  {
    id: "dept-goal-4",
    title: "Modernize IT Infrastructure",
    description: "Upgrade and enhance the airport's technology infrastructure to improve operational efficiency",
    smartCriteria: {
      specific: "Replace legacy systems and implement cloud-based solutions",
      measurable: "Reduce IT-related downtime by 40% and improve system response time by 25%",
      achievable: "Phase implementation over 8 months with dedicated IT resources",
      relevant: "Critical for digital transformation and operational excellence",
      timeBound: "Complete by end of Q3 2024"
    },
    status: "submitted", // Changed from 'in-progress'
    createdBy: "dir-009",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-04-15"),
    deadline: new Date("2024-09-30"),
    departmentId: "it",
    departmentName: "Information Technology Division",
    assignedEmployeeGoals: [],
    comments: []
  },
  {
    id: "dept-goal-5",
    title: "Implement Sustainable Practices",
    description: "Develop and implement environmentally sustainable practices across airport operations",
    smartCriteria: {
      specific: "Focus on waste reduction, energy efficiency, and carbon footprint",
      measurable: "Reduce waste by 30%, energy consumption by 20%, and carbon emissions by 15%",
      achievable: "Gradual implementation with investment in green technologies",
      relevant: "Aligns with global sustainability goals and enhances airport reputation",
      timeBound: "Full implementation by end of 2025"
    },
    status: "approved",
    createdBy: "dir-006",
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-15"),
    deadline: new Date("2025-12-31"),
    departmentId: "ops",
    departmentName: "Operations Division",
    assignedEmployeeGoals: [],
    comments: []
  },
  {
    id: "dept-goal-6",
    title: "Optimize Revenue Streams",
    description: "Identify and develop new revenue opportunities while optimizing existing streams",
    smartCriteria: {
      specific: "Focus on retail, advertising, and parking revenue optimization",
      measurable: "Increase non-aeronautical revenue by 15% year-over-year",
      achievable: "Through strategic partnerships and space optimization",
      relevant: "Critical for financial sustainability and growth",
      timeBound: "Implement key initiatives by Q4 2024"
    },
    status: "submitted", // Changed from 'draft'
    createdBy: "dir-010",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    deadline: new Date("2024-12-15"),
    departmentId: "fin",
    departmentName: "Finance Division",
    assignedEmployeeGoals: [],
    comments: []
  },
  {
    id: "dept-goal-7",
    title: "Enhance Employee Development",
    description: "Create comprehensive training and development programs for all staff levels",
    smartCriteria: {
      specific: "Implement skills assessment, training programs, and career pathing",
      measurable: "Ensure 90% of staff complete personal development plans and achieve 20% internal promotion rate",
      achievable: "Through scheduled training sessions and mentorship programs",
      relevant: "Supports talent retention and organizational capability",
      timeBound: "Framework in place by Q3 2024"
    },
    status: "submitted",
    createdBy: "dir-004",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    deadline: new Date("2024-09-30"),
    departmentId: "hr",
    departmentName: "Human Resources Division",
    assignedEmployeeGoals: [],
    comments: []
  },
  {
    id: "dept-goal-8",
    title: "Improve Air Traffic Management",
    description: "Enhance air traffic control systems and procedures to increase runway capacity",
    smartCriteria: {
      specific: "Upgrade ATC technology and optimize approach and departure procedures",
      measurable: "Increase peak hour movements by 12% while maintaining safety standards",
      achievable: "Through technology investment and procedure optimization",
      relevant: "Directly impacts airport capacity and airline satisfaction",
      timeBound: "Complete by Q2 2026"
    },
    status: "approved",
    createdBy: "dir-006",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-25"),
    deadline: new Date("2026-06-30"),
    departmentId: "ats",
    departmentName: "Air Traffic Services Division",
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
    status: "submitted", // Changed from 'in-progress'
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
  },
  {
    id: "emp-goal-3",
    title: "Optimize Baggage Handling Process",
    description: "Implement new procedures to reduce baggage handling time and minimize lost baggage",
    smartCriteria: {
      specific: "Redesign baggage sorting process and implement tracking technology",
      measurable: "Reduce baggage delivery time by 20% and decrease lost baggage incidents by 30%",
      achievable: "Through process optimization and staff training",
      relevant: "Directly contributes to operational efficiency department goal",
      timeBound: "Complete by end of Q2 2025"
    },
    status: "submitted",
    createdBy: "sup-003",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    deadline: new Date("2025-06-30"),
    employeeId: "emp-003",
    employeeName: "Robert Chen",
    supervisorId: "sup-003",
    linkedDepartmentGoalId: "dept-goal-2",
    progress: 0,
    comments: []
  },
  {
    id: "emp-goal-4",
    title: "Implement Advanced Security Screening Training",
    description: "Develop and deliver enhanced security screening training for all security personnel",
    smartCriteria: {
      specific: "Create and conduct training on latest threat detection techniques and technologies",
      measurable: "Train 100% of security staff and improve threat detection in simulations by 25%",
      achievable: "Through phased training program and practical exercises",
      relevant: "Supports department goal of enhancing security protocols",
      timeBound: "Complete training by end of Q1 2025"
    },
    status: "submitted", // Changed from 'in-progress'
    createdBy: "sup-004",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2025-01-05"),
    deadline: new Date("2025-03-31"),
    employeeId: "emp-004",
    employeeName: "Jennifer Lopez",
    supervisorId: "sup-004",
    linkedDepartmentGoalId: "dept-goal-3",
    progress: 45,
    comments: []
  },
  {
    id: "emp-goal-5",
    title: "Develop Airport Mobile App",
    description: "Create a mobile application to improve passenger experience and provide real-time information",
    smartCriteria: {
      specific: "Design and develop app with flight info, wayfinding, and retail information",
      measurable: "Achieve 50,000 downloads in first 6 months and 4-star rating",
      achievable: "Through agile development with IT team and user testing",
      relevant: "Supports IT modernization and customer satisfaction goals",
      timeBound: "Launch by Q3 2024"
    },
    status: "approved",
    createdBy: "sup-005",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-02-01"),
    deadline: new Date("2024-09-30"),
    employeeId: "emp-005",
    employeeName: "David Kumar",
    supervisorId: "sup-005",
    linkedDepartmentGoalId: "dept-goal-4",
    progress: 10,
    comments: []
  },
  {
    id: "emp-goal-6",
    title: "Reduce Carbon Footprint of Ground Operations",
    description: "Implement measures to reduce emissions from ground support equipment",
    smartCriteria: {
      specific: "Convert diesel equipment to electric and optimize vehicle routes",
      measurable: "Reduce ground operation emissions by 25% from 2024 baseline",
      achievable: "Through phased equipment replacement and route optimization",
      relevant: "Directly supports division's sustainability goal",
      timeBound: "Complete implementation by Q4 2025"
    },
    status: "submitted", // Changed from 'draft'
    createdBy: "sup-006",
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-01-20"),
    deadline: new Date("2025-12-31"),
    employeeId: "emp-006",
    employeeName: "Maria Garcia",
    supervisorId: "sup-006",
    linkedDepartmentGoalId: "dept-goal-5",
    progress: 0,
    comments: []
  },
  {
    id: "emp-goal-7",
    title: "Optimize Retail Space Utilization",
    description: "Analyze and improve retail space allocation to maximize revenue per square foot",
    smartCriteria: {
      specific: "Conduct space utilization analysis and implement optimized layout",
      measurable: "Increase revenue per square foot by 18% compared to previous year",
      achievable: "Through data analysis and phased implementation",
      relevant: "Directly supports revenue optimization goal",
      timeBound: "Complete analysis by Q2 2024 and implementation by Q3 2024"
    },
    status: "flagged",
    createdBy: "sup-007",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-25"),
    deadline: new Date("2024-09-30"),
    employeeId: "emp-007",
    employeeName: "Thomas Wright",
    supervisorId: "sup-007",
    linkedDepartmentGoalId: "dept-goal-6",
    progress: 15,
    comments: [
      {
        id: "comment-4",
        goalId: "emp-goal-7",
        authorId: "dir-010",
        authorName: "Daniel Garcia",
        authorRole: "Director",
        content: "The 18% target seems very ambitious. Please provide more details on how this will be achieved.",
        createdAt: new Date("2024-01-25"),
        isFlag: true
      }
    ]
  }
];
