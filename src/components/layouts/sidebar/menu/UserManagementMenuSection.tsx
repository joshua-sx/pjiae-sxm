
import { Users, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserRole } from '@/contexts/AuthContext';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface UserManagementMenuSectionProps {
  role: UserRole;
  isActive: (path: string) => boolean;
}

export function UserManagementMenuSection({ role, isActive }: UserManagementMenuSectionProps) {
  if (role !== 'HR Officer' && role !== 'IT Admin') return null;
  
  return (
    <Collapsible defaultOpen className="group/collapsible w-full">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip="User Management">
            <Users />
            <span>User Management</span>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 group-hover/collapsible:text-foreground/80 transition-transform group-[&[data-state=open]/collapsible]:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton 
                asChild 
                isActive={isActive('/user-list')}
              >
                <Link to="/user-list">User List</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton 
                asChild 
                isActive={isActive('/role-assignment')}
              >
                <Link to="/role-assignment">Role Assignment</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton 
                asChild 
                isActive={isActive('/access-logs')}
              >
                <Link to="/access-logs">Access Logs</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            
            {/* HR Officer specific */}
            {role === 'HR Officer' && (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={isActive('/appraiser-assignments')}
                >
                  <Link to="/appraiser-assignments">Appraiser Assignments</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
