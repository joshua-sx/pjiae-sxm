
import React from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatusIndicatorProps } from "@/types/organization";

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const isCompleted = status === "completed";
  
  return (
    <Badge
      className={cn(
        "gap-1 font-normal",
        isCompleted 
          ? "bg-green-100 text-green-800 hover:bg-green-200" 
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      )}
    >
      {isCompleted ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <X className="h-3.5 w-3.5" />
      )}
      {isCompleted ? "Completed" : "Not Started"}
    </Badge>
  );
};
