
import { Bell, Menu } from 'lucide-react';
import { useState } from 'react';
import { LAYOUT_CONSTANTS } from '@/lib/utils';
import { useSidebar, SidebarTrigger } from '@/components/ui/sidebar';

const TopBar = () => {
  const [notificationCount] = useState(3);
  const { setOpenMobile } = useSidebar();

  return (
    <div className={`border-b bg-white flex items-center justify-between px-6 fixed top-0 right-0 left-0 z-50 shadow-sm ${LAYOUT_CONSTANTS.HEADER_HEIGHT}`}>
      {/* Left side - Hamburger menu on mobile and app title */}
      <div className="h-full flex items-center gap-3">
        <button 
          className="md:hidden p-1 rounded-md hover:bg-gray-100"
          onClick={() => setOpenMobile(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        
        <h1 className="text-xl font-semibold text-gray-800 m-0">Digital Appraisal System</h1>
        
        {/* Add sidebar trigger next to title */}
        <SidebarTrigger className="hidden md:flex text-gray-500 hover:text-gray-700" />
      </div>
      
      {/* Right side - Notifications only */}
      <div className="flex items-center">
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
