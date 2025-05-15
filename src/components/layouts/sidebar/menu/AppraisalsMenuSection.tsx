
import { ClipboardCheck, ChevronDown } from 'lucide-react';
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

interface AppraisalsMenuSectionProps {
  role: UserRole;
  isActive: (path: string) => boolean;
}

export function AppraisalsMenuSection({ role, isActive }: AppraisalsMenuSectionProps) {
  if (role === 'Director') return null;
  
  return (
    <Collapsible defaultOpen className="group/collapsible w-full">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip="Appraisals">
            <ClipboardCheck />
            <span>Appraisals</span>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 group-hover/collapsible:text-foreground/80 transition-transform group-[&[data-state=open]/collapsible]:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {/* Mid-Year Reviews */}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton 
                asChild 
                isActive={isActive('/mid-year-reviews')}
              >
                <Link to="/mid-year-reviews">
                  {role === 'Employee' ? 'My Mid-Year Review' : 'Mid-Year Reviews'}
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            
            {/* Final Assessments */}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton 
                asChild 
                isActive={isActive('/final-assessments')}
              >
                <Link to="/final-assessments">
                  {role === 'Employee' ? 'My Final Assessment' : 'Final Assessments'}
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            
            {/* HR Officer specific items */}
            {role === 'HR Officer' && (
              <>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/pending-forms')}
                  >
                    <Link to="/pending-forms">Pending Forms</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isActive('/flagged-items')}
                  >
                    <Link to="/flagged-items">Flagged Items</Link>
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
