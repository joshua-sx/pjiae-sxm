
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { CycleSelector } from "@/components/cycle/CycleSelector";
import { PhaseTable } from "@/components/cycle/PhaseTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AppraisalCycle } from "@/types/cycle";
import { mockCycles } from "@/data/mockCycles";
import { PageHeader } from '@/components/common/PageHeader';

const CycleSettings = () => {
  const { toast } = useToast();
  const [cycles, setCycles] = useState<AppraisalCycle[]>(mockCycles);
  const [selectedCycleId, setSelectedCycleId] = useState<string>(mockCycles[0].id);
  const [isSaving, setIsSaving] = useState(false);

  // Find the currently selected cycle
  const selectedCycle = cycles.find(cycle => cycle.id === selectedCycleId) || cycles[0];

  const handleCycleChange = (cycleId: string) => {
    setSelectedCycleId(cycleId);
  };

  const handleToggleLock = (phaseId: string) => {
    setCycles(currentCycles => 
      currentCycles.map(cycle => {
        if (cycle.id === selectedCycleId) {
          return {
            ...cycle,
            phases: cycle.phases.map(phase => {
              if (phase.id === phaseId) {
                return {
                  ...phase,
                  locked: !phase.locked
                };
              }
              return phase;
            })
          };
        }
        return cycle;
      })
    );
  };

  const handleSave = () => {
    setIsSaving(true);

    // Simulate saving to backend
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Cycle settings updated",
        description: `Changes to ${selectedCycle.name} have been saved.`,
      });

      // Simulate an audit log entry
      console.log(`Cycle settings updated for ${selectedCycle.name} by HR Admin at ${new Date().toISOString()}`);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Cycle Settings"
          actions={
            <CycleSelector 
              cycles={cycles} 
              selectedCycleId={selectedCycleId} 
              onCycleChange={handleCycleChange} 
            />
          }
        />

        <div className="space-y-4">
          <PhaseTable 
            phases={selectedCycle.phases}
            onToggleLock={handleToggleLock}
          />

          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CycleSettings;
