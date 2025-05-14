
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  role: "employee" | "manager" | "director" | "hr";
  firstAppraiserId?: string;
  secondAppraiserId?: string;
}

export interface AppraiserAssignment {
  employeeId: string;
  firstAppraiserId?: string;
  secondAppraiserId?: string;
}

export const employees: Employee[] = [
  {
    id: "e001",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "IT",
    jobTitle: "Systems Engineer",
    role: "employee",
    firstAppraiserId: "e010",
    secondAppraiserId: "e008"
  },
  {
    id: "e002",
    name: "Jane Brown",
    email: "jane.brown@example.com",
    department: "Security",
    jobTitle: "Security Officer",
    role: "employee",
    firstAppraiserId: "e011"
  },
  {
    id: "e003",
    name: "David Martinez",
    email: "david.martinez@example.com",
    department: "Operations",
    jobTitle: "Operations Coordinator",
    role: "employee"
  },
  {
    id: "e004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Human Resources",
    jobTitle: "HR Specialist",
    role: "employee",
    firstAppraiserId: "e012"
  },
  {
    id: "e005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "IT",
    jobTitle: "IT Manager",
    role: "manager",
  },
  {
    id: "e006",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Finance",
    jobTitle: "Financial Analyst",
    role: "employee",
    firstAppraiserId: "e009"
  },
  {
    id: "e007",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    department: "Security",
    jobTitle: "Security Officer",
    role: "employee"
  },
  {
    id: "e008",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    department: "IT",
    jobTitle: "CIO",
    role: "director"
  },
  {
    id: "e009",
    name: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    department: "Finance",
    jobTitle: "Finance Manager",
    role: "manager"
  },
  {
    id: "e010",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    department: "IT",
    jobTitle: "IT Team Lead",
    role: "manager"
  },
  {
    id: "e011",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    department: "Security",
    jobTitle: "Security Director",
    role: "director"
  },
  {
    id: "e012",
    name: "Patricia White",
    email: "patricia.white@example.com",
    department: "Human Resources",
    jobTitle: "HR Director",
    role: "director"
  }
];

// Function to get available appraisers (managers and directors)
export const getAvailableAppraisers = () => {
  return employees.filter(employee => 
    employee.role === "manager" || employee.role === "director"
  );
};
