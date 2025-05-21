
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

const steps = [
  { id: 1, name: 'Welcome' },
  { id: 2, name: 'Organization' },
  { id: 3, name: 'Admin User' },
  { id: 4, name: 'Invite Team' },
  { id: 5, name: 'Complete' },
];

const OnboardingStepper = () => {
  const { currentStep } = useOnboarding();

  return (
    <div className="mb-8">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="flex items-center justify-center"
        >
          {steps.map((step, index) => (
            <li key={step.id} className={cn(
              index !== steps.length - 1 ? "flex-1" : "",
              "relative"
            )}>
              {step.id < currentStep ? (
                <div className="flex flex-col items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="mt-2 text-xs">{step.name}</span>
                </div>
              ) : step.id === currentStep ? (
                <div className="flex flex-col items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pjiae-blue text-white">
                    {step.id}
                  </span>
                  <span className="mt-2 text-xs font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 text-gray-500">
                    {step.id}
                  </span>
                  <span className="mt-2 text-xs text-gray-500">{step.name}</span>
                </div>
              )}
              
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4 left-0 w-full",
                    "flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      "h-0.5 w-full mx-8",
                      step.id < currentStep ? "bg-green-500" : "bg-gray-300"
                    )}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default OnboardingStepper;
