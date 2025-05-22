
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';
import { animateElement } from '@/utils/animations';
import { Check } from 'lucide-react';

const steps = [
  { id: 1, title: 'Welcome' },
  { id: 2, title: 'Organization' },
  { id: 3, title: 'Admin Account' },
  { id: 4, title: 'Invite Team' },
  { id: 5, title: 'Complete' },
];

const OnboardingStepper = () => {
  const { currentStep } = useOnboarding();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <div
              className={animateElement(
                cn(
                  "relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-colors duration-300",
                  step.id < currentStep
                    ? "border-primary bg-primary text-white"
                    : step.id === currentStep
                    ? "border-primary bg-white text-primary"
                    : "border-gray-300 bg-white text-gray-300"
                ),
                ["scale-in"]
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {step.id < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                step.id
              )}
            </div>

            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "hidden h-0.5 w-12 flex-shrink-0 md:block transition-colors duration-500",
                  step.id < currentStep
                    ? "bg-primary"
                    : "bg-gray-300"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Step titles */}
      <div className="mt-4 hidden grid-cols-5 text-center md:grid">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={animateElement(
              cn(
                "text-sm font-medium transition-colors duration-300",
                step.id <= currentStep ? "text-primary" : "text-gray-400"
              ),
              ["fade-in"]
            )}
            style={{ animationDelay: `${150 + index * 150}ms` }}
          >
            {step.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingStepper;
