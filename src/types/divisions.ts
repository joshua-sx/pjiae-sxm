
export type Division = {
  id: string;
  name: string;
  director: string;
  parentDivision?: string;
};

export const divisions: Division[] = [
  { id: "qa", name: "Quality & Safety Assurance Department", director: "Rebecca Johnson" },
  { id: "exec", name: "Executive Support Department", director: "Michael Chen" },
  { id: "proj", name: "Project & Planning Department", director: "Sophia Martinez" },
  { id: "hr", name: "Human Resources Division", director: "David Wilson" },
  { id: "com", name: "Commercial Division", director: "Emma Thompson" },
  { id: "ats", name: "Air Traffic Services Division", director: "James Rodriguez" },
  { id: "tech", name: "Technical Division", director: "Olivia Parker" },
  { id: "ops", name: "Operations Division", director: "Alexander Kim" },
  { id: "it", name: "Information Technology Division", director: "Samantha Lee" },
  { id: "fin", name: "Finance Division", director: "Daniel Garcia" },
  { id: "non-aero", name: "(Non-) Aeronautical Department", director: "Natalie Wong", parentDivision: "com" },
  { id: "marketing", name: "Marketing & Communication Department", director: "Robert Taylor", parentDivision: "com" },
  { id: "cust-serv", name: "Customer Services Department", director: "Jennifer Adams", parentDivision: "com" },
  { id: "ats-dept", name: "Air Traffic Services Department", director: "Thomas Brown", parentDivision: "ats" },
  { id: "atc-train", name: "Air Traffic Controller Training Department", director: "Amelia Jackson", parentDivision: "ats" },
  { id: "maint-mgmt", name: "Maintenance Management Department", director: "William Davis", parentDivision: "tech" },
  { id: "serv-desk", name: "Service Desk Department", director: "Elizabeth Miller", parentDivision: "tech" },
  { id: "elec-mech", name: "Electrical & Mechanical Department", director: "Christopher Wilson", parentDivision: "tech" },
  { id: "facility", name: "Facility Maintenance Department", director: "Victoria Moore", parentDivision: "tech" },
  { id: "proj-mgmt", name: "Project Management Unit Division", director: "Andrew Clark", parentDivision: "tech" },
  { id: "compliance", name: "Compliance & Capacity Planning Department", director: "Sophia Anderson", parentDivision: "ops" },
  { id: "ops-dept", name: "Operations Department", director: "Joseph White", parentDivision: "ops" },
  { id: "rescue", name: "Rescue & Fire Fighting Department", director: "Mia Thomas", parentDivision: "ops" },
  { id: "security", name: "Security Department", director: "Ethan Robinson", parentDivision: "ops" },
  { id: "corp-gov", name: "Corporate Governance & Compliance", director: "Grace Lewis", parentDivision: "fin" },
  { id: "risk", name: "Risk & Enterprise Management", director: "Ryan Young", parentDivision: "fin" },
  { id: "it-ops", name: "IT Operations & Strategy Department", director: "Olivia Turner", parentDivision: "it" },
  { id: "it-service", name: "IT Service Delivery & Administration Department", director: "Noah Harris", parentDivision: "it" },
  { id: "procurement", name: "Procurement Department", director: "Emma Scott", parentDivision: "fin" },
  { id: "accounting", name: "Accounting Department", director: "Benjamin Walker", parentDivision: "fin" },
  { id: "reporting", name: "Reporting Department", director: "Ava King", parentDivision: "fin" }
];

export function getParentDivisions(): Division[] {
  return divisions.filter(d => !d.parentDivision);
}

export function getDivisionById(id: string): Division | undefined {
  return divisions.find(d => d.id === id);
}
