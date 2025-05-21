
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/lib/permissions/roles';

interface Organization {
  name: string;
  industry?: string;
  size?: string;
}

interface AdminUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

interface TeamInvite {
  email: string;
  role: UserRole;
}

interface OnboardingContextType {
  organization: Organization;
  adminUser: AdminUser;
  teamInvites: TeamInvite[];
  currentStep: number;
  updateOrganization: (org: Partial<Organization>) => void;
  updateAdminUser: (user: Partial<AdminUser>) => void;
  addTeamInvite: (invite: TeamInvite) => void;
  removeTeamInvite: (email: string) => void;
  updateTeamInvite: (email: string, data: Partial<TeamInvite>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setCurrentStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [organization, setOrganization] = useState<Organization>({ name: '' });
  const [adminUser, setAdminUser] = useState<AdminUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: UserRole.HR_OFFICER // Default role, will be set properly when created
  });
  const [teamInvites, setTeamInvites] = useState<TeamInvite[]>([]);

  const updateOrganization = (org: Partial<Organization>) => {
    setOrganization(prevOrg => ({ ...prevOrg, ...org }));
  };

  const updateAdminUser = (user: Partial<AdminUser>) => {
    setAdminUser(prevUser => ({ ...prevUser, ...user }));
  };

  const addTeamInvite = (invite: TeamInvite) => {
    setTeamInvites(prev => [...prev, invite]);
  };

  const removeTeamInvite = (email: string) => {
    setTeamInvites(prev => prev.filter(invite => invite.email !== email));
  };

  const updateTeamInvite = (email: string, data: Partial<TeamInvite>) => {
    setTeamInvites(prev => 
      prev.map(invite => 
        invite.email === email ? { ...invite, ...data } : invite
      )
    );
  };

  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const value = {
    organization,
    adminUser,
    teamInvites,
    currentStep,
    updateOrganization,
    updateAdminUser,
    addTeamInvite,
    removeTeamInvite,
    updateTeamInvite,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
