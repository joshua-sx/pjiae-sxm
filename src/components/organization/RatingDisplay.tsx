
import React from "react";
import { RatingDisplayProps } from "@/types/organization";

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating }) => {
  if (rating === null) {
    return <span className="text-gray-500">—</span>;
  }
  
  let label = "";
  
  if (rating >= 4.5) {
    label = "Excellent";
  } else if (rating >= 3.5) {
    label = "Exceeds Expectations";
  } else if (rating >= 2.5) {
    label = "Meets Expectations";
  } else if (rating >= 1.5) {
    label = "Needs Improvement";
  } else {
    label = "Unsatisfactory";
  }
  
  return (
    <div className="flex items-center">
      <span className="font-medium">{label}</span>
      <span className="ml-1.5 text-sm text-gray-500">
        ({rating.toFixed(1)}/5)
      </span>
    </div>
  );
};
