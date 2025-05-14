
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Home,
  ClipboardCheck,
  Target,
  ListChecks,
  Users,
  BarChart,
  Bell,
  UserCircle,
  Settings,
  ChevronDown,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AppSidebar() {
  const { role } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  
  // Define menu visibility based on role
  const showHRMenu = role === 'HR Officer';
  const showDirectorMenu = role === 'Director';
  const showSupervisorMenu = role === 'Supervisor' || role === 'Director';
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="border-b py-3">
        <div className="px-4 flex items-center">
          {state === "expanded" ? (
            <div className="font-bold text-xl text-blue-600">PJIAE</div>
          ) : (
            <div className="w-full flex justify-center">
              <span className="font-bold text-xl text-blue-600">P</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <ScrollArea className="flex-1 h-full">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/')} tooltip="Dashboard">
                <Link to="/">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {/* Appraisals Section */}
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
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton 
                        asChild 
                        isActive={isActive('/my-appraisals')}
                      >
                        <Link to="/my-appraisals">All Appraisals</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/goal-setting">Goal Setting</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/mid-year-reviews">Mid-Year Reviews</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/year-end-evaluations">Year-End Evaluations</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/improvement-plans">Improvement Plans</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    {showHRMenu && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/flagged-forms">Flagged Forms</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            
            {/* Goals Section - Updated to use unified Goals page */}
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/goals')}
                tooltip="Goals"
              >
                <Link to="/goals">
                  <Target />
                  <span>Goals</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {/* Team & Organization Section - Visible to HR */}
            {showHRMenu && (
              <Collapsible defaultOpen className="group/collapsible w-full">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Team & Organization">
                      <Users />
                      <span>Team & Organization</span>
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0 group-hover/collapsible:text-foreground/80 transition-transform group-[&[data-state=open]/collapsible]:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton 
                          asChild 
                          isActive={isActive('/organization')}
                        >
                          <Link to="/organization">Employee Directory</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/role-management">Role Management</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/appraiser-assignments">Appraiser Assignments</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
            
            {/* Reporting Section */}
            <Collapsible defaultOpen className="group/collapsible w-full">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Reporting">
                    <BarChart />
                    <span>Reporting</span>
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 group-hover/collapsible:text-foreground/80 transition-transform group-[&[data-state=open]/collapsible]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton 
                        asChild 
                        isActive={isActive('/reports')}
                      >
                        <Link to="/reports">Performance Analytics</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/score-distribution">Score Distribution</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/submission-progress">Submission Progress</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            
            {/* Notifications Section */}
            <Collapsible className="group/collapsible w-full">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Notifications">
                    <Bell />
                    <span>Notifications</span>
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 group-hover/collapsible:text-foreground/80 transition-transform group-[&[data-state=open]/collapsible]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/alerts">Alerts</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/reminders">Reminders</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/communication-history">Communication History</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            
            {/* Profile */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile" isActive={isActive('/profile')}>
                <Link to="/profile">
                  <UserCircle />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {/* Settings - Visible to HR Officers and Directors */}
            {(showHRMenu || showDirectorMenu) && (
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
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/cycle-configuration">Cycle Configuration</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/permissions">Permissions</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/document-uploads">Document Uploads</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/system-preferences">System Preferences</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="border-t py-3">
        {state === "expanded" ? (
          <div className="px-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} PJIAE</p>
            <p>Digital Appraisal System v1.0</p>
          </div>
        ) : (
          <div className="flex justify-center text-xs text-gray-500">
            <span>©</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
