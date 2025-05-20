
import React from 'react';
import { Users, Upload, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { UserManagementMenuItem } from './UserManagementMenuItem';

interface UserManagementMenuSectionProps {
  isActive: (path: string) => boolean;
}

export function UserManagementMenuSection({ isActive }: UserManagementMenuSectionProps) {
  const { hasPermission } = useAuth();
  
  if (!hasPermission('canViewEmployeeDirectory')) return null;
  
  return (
    <>
      {hasPermission('canManageUsers') && (
        <>
          <UserManagementMenuItem isActive={isActive} />
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/hr/employee-import')} tooltip="Import Employees">
              <Link to="/hr/employee-import">
                <Upload />
                <span>Import Employees</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/employees')} tooltip="Employee Directory">
          <Link to="/employees">
            <Users />
            <span>Employee Directory</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}
