
import { AppraisalCycle } from "@/types/cycle";

export const mockCycles: AppraisalCycle[] = [
  {
    id: "2025",
    name: "2025 Appraisal Cycle",
    year: 2025,
    phases: [
      {
        id: "goal-setting-2025",
        name: "Goal Setting",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-03-30"),
        status: "active",
        locked: true
      },
      {
        id: "mid-year-review-2025",
        name: "Mid-Year Review",
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-15"),
        status: "pending",
        locked: false
      },
      {
        id: "year-end-eval-2025",
        name: "Year-End Evaluation",
        startDate: new Date("2025-11-01"),
        endDate: new Date("2025-11-30"),
        status: "pending",
        locked: false
      }
    ]
  },
  {
    id: "2024",
    name: "2024 Appraisal Cycle",
    year: 2024,
    phases: [
      {
        id: "goal-setting-2024",
        name: "Goal Setting",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-30"),
        status: "completed",
        locked: true
      },
      {
        id: "mid-year-review-2024",
        name: "Mid-Year Review",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-07-15"),
        status: "completed",
        locked: true
      },
      {
        id: "year-end-eval-2024",
        name: "Year-End Evaluation",
        startDate: new Date("2024-11-01"),
        endDate: new Date("2024-11-30"),
        status: "completed",
        locked: true
      }
    ]
  }
];
