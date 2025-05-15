
import { Target, ChevronDown } from 'lucide-react';
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

interface GoalsMenuSectionProps {
  role: UserRole;
  isActive: (path: string) => boolean;
}

export function GoalsMenuSection({ role, isActive }: GoalsMenuSectionProps) {
  return (
    <Collapsible defaultOpen className="group/collapsible w-full">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip="Goals">
            <Target />
            <span>Goals</span>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 group-hover/collapsible:text-foreground/80 transition-transform group-[&[data-state=open]/collapsible]:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {/* Division Goals - Available to all except Employee */}
            {role !== 'Employee' && (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={isActive('/division-goals')}
                >
                  <Link to="/division-goals">Division Goals</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )}
            
            {/* Employee Goals - Available to all roles */}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton 
                asChild 
                isActive={isActive('/employee-goals')}
              >
                <Link to="/employee-goals">Employee Goals</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
