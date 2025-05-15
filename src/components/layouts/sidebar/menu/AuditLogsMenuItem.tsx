
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserRole } from '@/contexts/AuthContext';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface AuditLogsMenuItemProps {
  role: UserRole;
  isActive: (path: string) => boolean;
}

export function AuditLogsMenuItem({ role, isActive }: AuditLogsMenuItemProps) {
  if (role !== 'HR Officer' && role !== 'IT Admin') return null;
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/audit-logs')} tooltip="Audit Logs">
        <Link to="/audit-logs">
          <FileText />
          <span>Audit Logs</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
