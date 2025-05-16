
import React from "react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AppraisalPhase } from "@/types/cycle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/styled-table";

interface PhaseTableProps {
  phases: AppraisalPhase[];
  onToggleLock: (phaseId: string) => void;
}

export const PhaseTable = ({ phases, onToggleLock }: PhaseTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Phase</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Lock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {phases.map((phase) => (
          <TableRow key={phase.id}>
            <TableCell className="font-medium">{phase.name}</TableCell>
            <TableCell>{format(phase.startDate, "dd-MMM-yy")}</TableCell>
            <TableCell>{format(phase.endDate, "dd-MMM-yy")}</TableCell>
            <TableCell>
              <StatusBadge status={phase.status} />
            </TableCell>
            <TableCell className="text-right">
              <Switch 
                checked={phase.locked}
                onCheckedChange={() => onToggleLock(phase.id)}
                aria-label={`${phase.locked ? "Unlock" : "Lock"} ${phase.name} phase`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const StatusBadge = ({ status }: { status: AppraisalPhase["status"] }) => {
  let variant: "default" | "secondary" | "outline" = "outline";
  
  if (status === "active") {
    variant = "default";
  } else if (status === "completed") {
    variant = "secondary";
  }
  
  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
};
