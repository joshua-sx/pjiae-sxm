
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarMenu } from '@/components/ui/sidebar';

import { DashboardMenuItem } from './menu/DashboardMenuItem';
import { GoalsMenuSection } from './menu/GoalsMenuSection';
import { AppraisalsMenuSection } from './menu/AppraisalsMenuSection';
import { ReportsMenuSection } from './menu/ReportsMenuSection';
import { UserManagementMenuSection } from './menu/UserManagementMenuSection';
import { AuditLogsMenuItem } from './menu/AuditLogsMenuItem';
import { SettingsMenuSection } from './menu/SettingsMenuSection';
import { HelpMenuItem } from './menu/HelpMenuItem';

export function SidebarContent() {
  const { role } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <ScrollArea className="flex-1 h-full pt-6">
      <SidebarMenu>
        <DashboardMenuItem isActive={isActive} />
        <GoalsMenuSection role={role} isActive={isActive} />
        <AppraisalsMenuSection role={role} isActive={isActive} />
        <ReportsMenuSection role={role} isActive={isActive} />
        <UserManagementMenuSection role={role} isActive={isActive} />
        <AuditLogsMenuItem role={role} isActive={isActive} />
        <SettingsMenuSection role={role} isActive={isActive} />
        <HelpMenuItem isActive={isActive} />
      </SidebarMenu>
    </ScrollArea>
  );
}
