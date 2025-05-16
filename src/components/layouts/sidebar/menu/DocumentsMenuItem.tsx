
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface DocumentsMenuItemProps {
  isActive: (path: string) => boolean;
}

export function DocumentsMenuItem({ isActive }: DocumentsMenuItemProps) {
  const { hasPermission } = useAuth();
  
  if (!hasPermission('canUploadDocs')) return null;
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/hr/documents')} tooltip="Documents">
        <Link to="/hr/documents">
          <FileText />
          <span>Document Center</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
