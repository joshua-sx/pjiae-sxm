
import { Settings, ChevronDown } from 'lucide-react';
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

interface SettingsMenuSectionProps {
  role: UserRole;
  isActive: (path: string) => boolean;
}

export function SettingsMenuSection({ role, isActive }: SettingsMenuSectionProps) {
  return (
    <Collapsible className="group/collapsible w-full">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip="Settings">
            <Settings />
            <span>Settings</span>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 group-hover/collapsible:text-foreground/80 transition-transform group-[&[data-state=open]/collapsible]:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {/* Profile settings - All roles */}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton 
                asChild 
                isActive={isActive('/profile')}
              >
                <Link to="/profile">My Profile</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            
            {/* Password settings - All roles except HR (has security included) */}
            {role !== 'HR Officer' && (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={isActive('/change-password')}
                >
                  <Link to="/change-password">Change Password</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )}
            
            {/* HR Officer specific settings */}
            {role === 'HR Officer' && (
              <>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/cycle-settings')}
                  >
                    <Link to="/cycle-settings">Appraisal Cycle Settings</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/profile-security')}
                  >
                    <Link to="/profile-security">My Profile & Security</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </>
            )}
            
            {/* IT Admin specific settings */}
            {role === 'IT Admin' && (
              <>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/app-settings')}
                  >
                    <Link to="/app-settings">App Settings</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/backup-restore')}
                  >
                    <Link to="/backup-restore">Backup & Restore</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/ci-cd-configuration')}
                  >
                    <Link to="/ci-cd-configuration">CI/CD Configuration</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </>
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
