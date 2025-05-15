
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface DashboardMenuItemProps {
  isActive: (path: string) => boolean;
}

export function DashboardMenuItem({ isActive }: DashboardMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/')} tooltip="Dashboard">
        <Link to="/">
          <Home />
          <span>Dashboard</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
