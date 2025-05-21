
import React from 'react';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';
import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import OnboardingNavigation from '@/components/onboarding/OnboardingNavigation';
import { useOnboarding } from '@/contexts/OnboardingContext';

const WelcomePage = () => {
  const { setCurrentStep } = useOnboarding();

  // Set the current step on component mount
  React.useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  return (
    <OnboardingLayout>
      <OnboardingStepper />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Welcome to SmartGoals365</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Let's set up your organization and get you started with digital appraisals. This will only take a few minutes.
        </p>
      </div>

      <div className="mb-8">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-blue-800 mb-1">What we'll do:</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
            <li>Create your organization profile</li>
            <li>Set up your admin account</li>
            <li>Invite your team members (optional)</li>
            <li>Get you ready to start managing appraisals</li>
          </ul>
        </div>
      </div>

      <OnboardingNavigation 
        nextLabel="Get Started" 
        backDisabled={true} 
      />
    </OnboardingLayout>
  );
};

export default WelcomePage;
