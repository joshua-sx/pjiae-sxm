
import React from 'react';
import { cn } from '@/lib/utils';
import { ImportStep } from '@/hooks/useEmployeeImport';

interface ImportStepsProps {
  currentStep: ImportStep;
}

export const ImportSteps = ({ currentStep }: ImportStepsProps) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center">
        <StepIndicator 
          step={1} 
          label="Upload" 
          isActive={currentStep === 'upload'} 
          isCompleted={currentStep !== 'upload'} 
        />
        <StepConnector isActive={currentStep !== 'upload'} />
        <StepIndicator 
          step={2} 
          label="Map Fields" 
          isActive={currentStep === 'mapping'} 
          isCompleted={currentStep === 'preview' || currentStep === 'summary'} 
        />
        <StepConnector isActive={currentStep === 'preview' || currentStep === 'summary'} />
        <StepIndicator 
          step={3} 
          label="Preview" 
          isActive={currentStep === 'preview'} 
          isCompleted={currentStep === 'summary'} 
        />
        <StepConnector isActive={currentStep === 'summary'} />
        <StepIndicator 
          step={4} 
          label="Complete" 
          isActive={currentStep === 'summary'} 
          isCompleted={false} 
        />
      </div>
    </div>
  );
};

interface StepIndicatorProps {
  step: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepIndicator = ({ step, label, isActive, isCompleted }: StepIndicatorProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center",
      (isActive || isCompleted) ? "text-primary" : "text-gray-500"
    )}>
      <div 
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isActive || isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
        )}
      >
        {step}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

interface StepConnectorProps {
  isActive: boolean;
}

const StepConnector = ({ isActive }: StepConnectorProps) => {
  return (
    <div className={cn("w-12 h-1", isActive ? "bg-primary" : "bg-gray-200")}></div>
  );
};
