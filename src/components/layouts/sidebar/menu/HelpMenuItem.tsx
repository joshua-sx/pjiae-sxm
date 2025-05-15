
import { HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface HelpMenuItemProps {
  isActive: (path: string) => boolean;
}

export function HelpMenuItem({ isActive }: HelpMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/help')} tooltip="Help">
        <Link to="/help">
          <HelpCircle />
          <span>Help</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
