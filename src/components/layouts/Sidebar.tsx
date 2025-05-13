
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeftCircle, ChevronRightCircle, Home, BarChart, UserCircle, 
  ClipboardCheck, Settings, Users, Bell, FileChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { role } = useAuth();
  
  console.log("Current user role:", role); // Add this to debug the role
  
  // Define menu items, some are role-specific
  const getMenuItems = () => {
    const items = [
      { name: 'Dashboard', path: '/', icon: Home },
      { name: 'My Appraisals', path: '/my-appraisals', icon: ClipboardCheck },
    ];
    
    // Add Team Appraisals for Supervisors and up
    if (role === 'Supervisor' || role === 'Director' || role === 'HR Officer') {
      items.push({ name: 'Team Appraisals', path: '/team-appraisals', icon: Users });
    }
    
    // Add Organization only for HR Officers - ensure this is visible
    if (role === 'HR Officer') {
      console.log("Adding Organization menu item"); // Debug log
      items.push({ name: 'Organization', path: '/organization', icon: Users });
    }
    
    // Add common menu items
    items.push(
      { name: 'Reporting', path: '/reports', icon: BarChart },
      { name: 'Notifications', path: '/notifications', icon: Bell },
      { name: 'Profile', path: '/profile', icon: UserCircle },
    );
    
    // Add Settings for admins (HR Officers and Directors)
    if (role === 'HR Officer' || role === 'Director') {
      items.push({ name: 'Settings', path: '/settings', icon: Settings });
    }
    
    return items;
  };
  
  const menuItems = getMenuItems();

  return (
    <aside className={cn(
      "bg-white shadow-md relative transition-all duration-300 flex flex-col h-screen",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center p-4 border-b">
        {!collapsed && (
          <div className="font-bold text-xl text-blue-600">PJIAE DAS</div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <span className="font-bold text-xl text-blue-600">P</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 bg-white rounded-full shadow-md p-0.5 text-blue-600"
        >
          {collapsed ? <ChevronRightCircle size={20} /> : <ChevronLeftCircle size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 pt-5 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors",
                  location.pathname === item.path && "bg-gray-100 text-blue-600 font-medium border-l-4 border-blue-600",
                  collapsed && "justify-center"
                )}
              >
                <item.icon size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        {!collapsed ? (
          <div className="text-xs text-gray-500">
            <p>© {new Date().getFullYear()} PJIAE</p>
            <p>Digital Appraisal System v1.0</p>
          </div>
        ) : (
          <div className="flex justify-center text-xs text-gray-500">
            <span>©</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
