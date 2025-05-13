
export type ReviewStatus = "completed" | "not-started";

export interface EmployeeData {
  id: string;
  name: string;
  department: string;
  jobTitle: string;
  midYearStatus: ReviewStatus;
  midYearRating: number | null;
  endYearStatus: ReviewStatus;
  endYearRating: number | null;
}

export interface StatusIndicatorProps {
  status: ReviewStatus;
}

export interface RatingDisplayProps {
  rating: number | null;
}
