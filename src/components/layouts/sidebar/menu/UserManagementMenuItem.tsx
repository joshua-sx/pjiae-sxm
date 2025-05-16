
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface UserManagementMenuItemProps {
  isActive: (path: string) => boolean;
}

export function UserManagementMenuItem({ isActive }: UserManagementMenuItemProps) {
  const { hasPermission } = useAuth();
  
  if (!hasPermission('canManageUsers')) return null;
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/hr/users')} tooltip="User Management">
        <Link to="/hr/users">
          <Users />
          <span>User Management</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
