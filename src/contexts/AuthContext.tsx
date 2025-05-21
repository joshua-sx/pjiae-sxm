
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRole, hasPermission, Capability } from '@/lib/permissions';

// Extend the user interface to include organization information
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
}

// Context interface
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  hasPermission: (capability: Capability) => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isInOrganization: boolean;
  setUser: (user: User | null) => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(UserRole.HR_OFFICER);
  
  // Calculate if user belongs to an organization
  const isInOrganization = Boolean(user?.organizationId);
  const isAuthenticated = Boolean(user);

  // Check if the user is already authenticated on mount
  useEffect(() => {
    // In a real app, you would check local storage or session storage for user info
    // For now, we'll just use our mock state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.role) {
          setRole(parsedUser.role);
        }
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        // Clear invalid data
        localStorage.removeItem('user');
      }
    }
  }, []);

  const checkPermission = (capability: Capability): boolean => {
    return hasPermission(role, capability);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, make an API call to authenticate
      // Here we just simulate a successful login
      console.log('Login attempt:', { email, password });

      // Simulate successful login
      const mockUser: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email,
        role: UserRole.HR_OFFICER,
        organizationId: '1',
        organizationName: 'PJIAE',
      };

      // Save user to state and storage
      setUser(mockUser);
      setRole(mockUser.role);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated,
      user,
      role, 
      setRole,
      hasPermission: checkPermission,
      login,
      logout,
      isInOrganization,
      setUser,
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
