
export interface AppraisalPhase {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "pending" | "completed";
  locked: boolean;
}

export interface AppraisalCycle {
  id: string;
  name: string;
  year: number;
  phases: AppraisalPhase[];
}

export type PhaseType = "goal-setting" | "mid-year-review" | "year-end-evaluation";
