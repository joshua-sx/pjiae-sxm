
import { Bell, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LAYOUT_CONSTANTS } from '@/lib/utils';
import { useSidebar, SidebarTrigger } from '@/components/ui/sidebar';

const TopBar = () => {
  const [notificationCount] = useState(3);
  const navigate = useNavigate();
  const { role, setRole } = useAuth();
  const { setOpenMobile } = useSidebar();

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as UserRole);
  };

  return (
    <div className={`border-b bg-white flex items-center justify-between px-6 fixed top-0 right-0 left-0 z-20 ml-0 md:ml-[var(--sidebar-width)] transition-[margin] ease-linear peer-data-[state=collapsed]:ml-0 peer-data-[collapsible=icon]:md:ml-[var(--sidebar-width-icon)] shadow-sm ${LAYOUT_CONSTANTS.HEADER_HEIGHT}`}>
      {/* Left side - Hamburger menu on mobile and app title */}
      <div className="h-full flex items-center gap-3">
        <button 
          className="md:hidden p-1 rounded-md hover:bg-gray-100"
          onClick={() => setOpenMobile(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        
        {/* Add sidebar trigger button - only visible on desktop */}
        <div className="hidden md:flex items-center">
          <SidebarTrigger className="text-gray-500 hover:text-gray-700 mr-2" />
        </div>
        
        <h1 className="hidden md:block text-xl font-semibold text-gray-800 m-0">Digital Appraisal System</h1>
      </div>
      
      {/* Right side - Role selector and notifications only */}
      <div className="flex items-center space-x-5">
        {/* Role selector dropdown */}
        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-[150px] h-8 text-sm">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserRole.HR_OFFICER}>{UserRole.HR_OFFICER}</SelectItem>
            <SelectItem value={UserRole.DIRECTOR}>{UserRole.DIRECTOR}</SelectItem>
            <SelectItem value={UserRole.SUPERVISOR}>{UserRole.SUPERVISOR}</SelectItem>
            <SelectItem value={UserRole.EMPLOYEE}>{UserRole.EMPLOYEE}</SelectItem>
            <SelectItem value={UserRole.IT_ADMIN}>{UserRole.IT_ADMIN}</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Notification bell with badge */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
