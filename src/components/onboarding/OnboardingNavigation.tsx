
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { animateElement } from '@/utils/animations';

interface OnboardingNavigationProps {
  onNext?: () => boolean | Promise<boolean>;
  nextDisabled?: boolean;
  nextLabel?: string;
  showSkip?: boolean;
  showBack?: boolean;
}

const OnboardingNavigation = ({
  onNext,
  nextDisabled = false,
  nextLabel = 'Continue',
  showSkip = false,
  showBack = true,
}: OnboardingNavigationProps) => {
  const navigate = useNavigate();
  const { currentStep, goToNextStep, goToPreviousStep } = useOnboarding();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = async () => {
    if (onNext) {
      setIsLoading(true);
      try {
        const canProceed = await onNext();
        if (canProceed) {
          goToNextStep();
          navigate(getNextPath(currentStep));
        }
      } catch (error) {
        console.error('Error in next handler:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      goToNextStep();
      navigate(getNextPath(currentStep));
    }
  };

  const handleBack = () => {
    goToPreviousStep();
    navigate(getPreviousPath(currentStep));
  };

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="space-x-2">
        {showBack && currentStep > 1 && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleBack}
            className={animateElement("", ["fade-in", "hover-lift"])}
          >
            Back
          </Button>
        )}
        
        {showSkip && (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => navigate('/onboarding/complete')}
            className={animateElement("", ["fade-in", "hover-lift"])}
          >
            Skip
          </Button>
        )}
      </div>
      
      <Button 
        type="button" 
        onClick={handleNext} 
        disabled={nextDisabled || isLoading}
        className={animateElement("min-w-[100px]", ["fade-in", "hover-scale"])}
      >
        {isLoading ? 'Loading...' : nextLabel}
      </Button>
    </div>
  );
};

// Helper functions to determine navigation paths
const getNextPath = (currentStep: number): string => {
  switch (currentStep) {
    case 1:
      return '/onboarding/create-organization';
    case 2:
      return '/onboarding/create-admin-user';
    case 3:
      return '/onboarding/invite-team';
    case 4:
    default:
      return '/onboarding/complete';
  }
};

const getPreviousPath = (currentStep: number): string => {
  switch (currentStep) {
    case 2:
      return '/onboarding/welcome';
    case 3:
      return '/onboarding/create-organization';
    case 4:
      return '/onboarding/create-admin-user';
    case 5:
      return '/onboarding/invite-team';
    default:
      return '/onboarding/welcome';
  }
};

export default OnboardingNavigation;
