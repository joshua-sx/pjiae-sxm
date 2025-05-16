
import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, hasPermission, Capability } from '@/lib/permissions';

// Context interface
interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  hasPermission: (capability: Capability) => boolean;
  // This would be expanded with real auth in the future
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Change default role to HR Officer temporarily to see the Organization menu
  const [role, setRole] = useState<UserRole>(UserRole.HR_OFFICER);

  const checkPermission = (capability: Capability): boolean => {
    return hasPermission(role, capability);
  };

  return (
    <AuthContext.Provider value={{ 
      role, 
      setRole,
      hasPermission: checkPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export UserRole for convenience
export { UserRole, type Capability } from '@/lib/permissions';
