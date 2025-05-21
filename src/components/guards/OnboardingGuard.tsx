import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface OnboardingGuardProps {
  children: ReactNode;
}

const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { role } = useAuth();

  // In a real application, you would check if the user already belongs to an organization
  // For now, we'll just check if the user has a role set
  const isInOrganization = role !== undefined;

  useEffect(() => {
    if (isInOrganization) {
      // Redirect to dashboard if user is already in an organization
      navigate('/');
    }
  }, [isInOrganization, navigate]);

  // If user is already in an organization, don't render the children
  if (isInOrganization) {
    return null;
  }

  // Otherwise, render the children (onboarding flow)
  return <>{children}</>;
};

export default OnboardingGuard;
