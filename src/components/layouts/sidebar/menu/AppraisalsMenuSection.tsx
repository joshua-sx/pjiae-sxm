
import { ClipboardCheck, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AppraisalsMenuSectionProps {
  isActive: (path: string) => boolean;
}

export function AppraisalsMenuSection({ isActive }: AppraisalsMenuSectionProps) {
  const { role, hasPermission } = useAuth();
  
  // Only directors can't see appraisals
  if (role === UserRole.DIRECTOR) return null;
  
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
                  {role === UserRole.EMPLOYEE ? 'My Mid-Year Review' : 'Mid-Year Reviews'}
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
                  {role === UserRole.EMPLOYEE ? 'My Final Assessment' : 'Final Assessments'}
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            
            {/* HR Officer specific items */}
            {hasPermission('canViewPendingForms') && (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={isActive('/pending-forms')}
                >
                  <Link to="/pending-forms">Pending Forms</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )}
            
            {hasPermission('canViewFlaggedItems') && (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={isActive('/flagged-items')}
                >
                  <Link to="/flagged-items">Flagged Items</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
