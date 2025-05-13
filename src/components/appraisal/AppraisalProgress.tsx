
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AppraisalProgressProps {
  currentStep: number;
  steps: Array<{
    id: number;
    name: string;
    status: "completed" | "current" | "upcoming";
  }>;
}

const AppraisalProgress = ({ currentStep, steps }: AppraisalProgressProps) => {
  return (
    <div className="py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            <div
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full",
                step.status === "completed" && "bg-pjiae-blue text-white",
                step.status === "current" && "bg-pjiae-lightblue text-white",
                step.status === "upcoming" && "bg-gray-200 text-gray-500"
              )}
            >
              {step.status === "completed" ? (
                <Check size={16} />
              ) : (
                step.id
              )}
            </div>
            <div className="text-xs mt-2 text-center max-w-[80px]">
              {step.name}
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "absolute top-4 left-full h-[2px] w-[calc(100%-2rem)]",
                  step.status === "completed" ? "bg-pjiae-blue" : "bg-gray-200"
                )}
                style={{ transform: "translateX(-50%)" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppraisalProgress;
