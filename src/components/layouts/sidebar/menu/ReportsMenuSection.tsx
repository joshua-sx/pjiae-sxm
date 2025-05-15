
import { BarChart, ChevronDown } from 'lucide-react';
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

interface ReportsMenuSectionProps {
  role: UserRole;
  isActive: (path: string) => boolean;
}

export function ReportsMenuSection({ role, isActive }: ReportsMenuSectionProps) {
  if (role === 'Employee') return null;
  
  return (
    <Collapsible defaultOpen className="group/collapsible w-full">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip="Reports & Analytics">
            <BarChart />
            <span>Reports & Analytics</span>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 group-hover/collapsible:text-foreground/80 transition-transform group-[&[data-state=open]/collapsible]:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {/* Goals Analytics */}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton 
                asChild 
                isActive={isActive('/goals-analytics')}
              >
                <Link to="/goals-analytics">Goals Analytics</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            
            {/* Mid-Year Reports - Not for Director */}
            {role !== 'Director' && (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={isActive('/mid-year-reports')}
                >
                  <Link to="/mid-year-reports">Mid-Year Reports</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )}
            
            {/* Final Assessment Reports - Not for Director */}
            {role !== 'Director' && (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={isActive('/final-assessment-reports')}
                >
                  <Link to="/final-assessment-reports">Final Assessment Reports</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )}
            
            {/* IT Admin specific reports */}
            {role === 'IT Admin' && (
              <>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/system-usage-reports')}
                  >
                    <Link to="/system-usage-reports">System Usage Reports</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/error-performance-metrics')}
                  >
                    <Link to="/error-performance-metrics">Error & Performance Metrics</Link>
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
