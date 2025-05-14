
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppraisalCycle } from "@/types/cycle";

interface CycleSelectorProps {
  cycles: AppraisalCycle[];
  selectedCycleId: string;
  onCycleChange: (cycleId: string) => void;
}

export const CycleSelector = ({ 
  cycles, 
  selectedCycleId, 
  onCycleChange 
}: CycleSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Cycle:</span>
      <Select value={selectedCycleId} onValueChange={onCycleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select cycle" />
        </SelectTrigger>
        <SelectContent>
          {cycles.map((cycle) => (
            <SelectItem key={cycle.id} value={cycle.id}>
              {cycle.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
