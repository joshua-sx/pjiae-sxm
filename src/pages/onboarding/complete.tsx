
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';
import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';

const CompletePage = () => {
  const navigate = useNavigate();
  const { organization, adminUser, teamInvites, setCurrentStep } = useOnboarding();

  // Set the current step on component mount
  React.useEffect(() => {
    setCurrentStep(5);

    // In a real app, you might want to record analytics when setup completes
    console.log('Onboarding completed', {
      organization,
      adminUser,
      invitedTeamMembers: teamInvites.length,
    });
  }, [setCurrentStep, organization, adminUser, teamInvites]);

  const navigateToDashboard = () => {
    navigate('/');
  };

  return (
    <OnboardingLayout>
      <OnboardingStepper />

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Setup Complete!</h1>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Congratulations! Your organization {organization.name} has been successfully set up.
        </p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium mb-3">What's next?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
              <span>Set up your organization profile</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
              <span>Create your admin account</span>
            </li>
            {teamInvites.length > 0 ? (
              <li className="flex items-start">
                <span className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                <span>Invite {teamInvites.length} team members</span>
              </li>
            ) : null}
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-800 text-xs mr-2 mt-0.5">1</span>
              <span>Configure your appraisal cycle</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-800 text-xs mr-2 mt-0.5">2</span>
              <span>Set up department goals</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-800 text-xs mr-2 mt-0.5">3</span>
              <span>Start your first appraisal cycle</span>
            </li>
          </ul>
        </div>

        <div className="text-center pt-4">
          <Button size="lg" onClick={navigateToDashboard}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CompletePage;
