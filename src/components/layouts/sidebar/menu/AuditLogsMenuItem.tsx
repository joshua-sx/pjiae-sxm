
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface AuditLogsMenuItemProps {
  isActive: (path: string) => boolean;
}

export function AuditLogsMenuItem({ isActive }: AuditLogsMenuItemProps) {
  const { hasPermission } = useAuth();
  
  if (!hasPermission('canAccessAuditLogs')) return null;
  
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
