import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Home,
  ClipboardCheck,
  Target,
  BarChart,
  Bell,
  UserCircle,
  Settings,
  ChevronDown,
  Users,
  FileText,
  Shield,
  CalendarDays,
  HelpCircle,
  ListCheck,
  User,
  Layout,
  FileCog,
  Folder,
  ServerCog
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
  useSidebar
} from '@/components/ui/sidebar';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AppSidebar() {
  const { role } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-16 flex items-center">
        <div className="px-4 flex items-center h-full">
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
            {/* Dashboard - All roles have access */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/')} tooltip="Dashboard">
                <Link to="/">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {/* Goals Section - Role specific */}
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
            
            {/* Appraisals Section - Not available to Director */}
            {role !== 'Director' && (
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
            )}
            
            {/* Reports & Analytics - Available to all except Employee */}
            {role !== 'Employee' && (
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
            )}
            
            {/* User Management - Available to HR and IT Admin */}
            {(role === 'HR Officer' || role === 'IT Admin') && (
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
            )}
            
            {/* Audit Logs - Available to HR and IT Admin */}
            {(role === 'HR Officer' || role === 'IT Admin') && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/audit-logs')} tooltip="Audit Logs">
                  <Link to="/audit-logs">
                    <FileText />
                    <span>Audit Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            
            {/* Settings - All roles have access but with different options */}
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
            
            {/* Help - Available to all roles */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/help')} tooltip="Help">
                <Link to="/help">
                  <HelpCircle />
                  <span>Help</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
