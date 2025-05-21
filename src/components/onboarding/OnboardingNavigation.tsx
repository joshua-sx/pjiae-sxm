
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface OnboardingNavigationProps {
  nextDisabled?: boolean;
  backDisabled?: boolean;
  onNext?: () => Promise<boolean> | boolean;
  onBack?: () => void;
  nextLabel?: string;
  skipLink?: string;
  skipLabel?: string;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  nextDisabled = false,
  backDisabled = false,
  onNext,
  onBack,
  nextLabel = 'Next',
  skipLink,
  skipLabel = 'Skip this step',
}) => {
  const navigate = useNavigate();
  const { goToNextStep, goToPreviousStep, currentStep } = useOnboarding();

  const handleNext = async () => {
    if (onNext) {
      const canProceed = await onNext();
      if (!canProceed) return;
    }
    
    goToNextStep();
    
    const routes = [
      '/onboarding/welcome',
      '/onboarding/create-organization',
      '/onboarding/create-admin-user',
      '/onboarding/invite-team',
      '/onboarding/complete',
    ];
    
    if (currentStep < routes.length) {
      navigate(routes[currentStep]);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    
    goToPreviousStep();
    
    const routes = [
      '/onboarding/welcome',
      '/onboarding/create-organization',
      '/onboarding/create-admin-user',
      '/onboarding/invite-team',
      '/onboarding/complete',
    ];
    
    if (currentStep > 1) {
      navigate(routes[currentStep - 2]);
    }
  };

  const handleSkip = () => {
    if (skipLink) {
      navigate(skipLink);
    }
  };

  return (
    <div className="flex justify-between mt-8">
      <div>
        {!backDisabled && currentStep > 1 && (
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
      </div>
      <div className="flex space-x-3">
        {skipLink && (
          <Button type="button" variant="ghost" onClick={handleSkip}>
            {skipLabel}
          </Button>
        )}
        <Button 
          type="button" 
          disabled={nextDisabled} 
          onClick={handleNext}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingNavigation;
