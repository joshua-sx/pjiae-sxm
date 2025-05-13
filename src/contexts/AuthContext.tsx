
import { createContext, useContext, useState, ReactNode } from 'react';

// Define available roles
export type UserRole = 'HR Officer' | 'Director' | 'Supervisor' | 'Employee';

// Context interface
interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  // This would be expanded with real auth in the future
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('Employee');

  return (
    <AuthContext.Provider value={{ role, setRole }}>
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
