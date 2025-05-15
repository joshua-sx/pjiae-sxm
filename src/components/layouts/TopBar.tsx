
import { Bell, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LAYOUT_CONSTANTS } from '@/lib/utils';

const TopBar = () => {
  const [notificationCount] = useState(3);
  const navigate = useNavigate();
  const { role, setRole } = useAuth();

  // Mock user state - would come from auth context in real app
  const user = {
    name: "John Doe",
    role: role,
    avatar: "/placeholder.svg"
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };

  return (
    <div className={`border-b bg-white flex items-center justify-between px-6 fixed top-0 right-0 left-0 z-20 ml-0 md:ml-[var(--sidebar-width)] transition-[margin] ease-linear peer-data-[state=collapsed]:ml-0 peer-data-[collapsible=icon]:md:ml-[var(--sidebar-width-icon)] ${LAYOUT_CONSTANTS.HEADER_HEIGHT}`}>
      {/* Left side - App title only */}
      <div className="h-full flex items-center">
        <h1 className="text-xl font-semibold text-gray-800 m-0">Digital Appraisal System</h1>
      </div>
      
      {/* Right side - Role selector, notifications, user menu */}
      <div className="flex items-center space-x-5">
        {/* Role selector dropdown */}
        <Select value={role} onValueChange={(value) => handleRoleChange(value as UserRole)}>
          <SelectTrigger className="w-[150px] h-8 text-sm">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HR Officer">HR Officer</SelectItem>
            <SelectItem value="Director">Director</SelectItem>
            <SelectItem value="Supervisor">Supervisor</SelectItem>
            <SelectItem value="Employee">Employee</SelectItem>
            <SelectItem value="IT Admin">IT Admin</SelectItem>
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
        
        {/* User avatar dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-gray-100">
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={user.avatar}
                  alt="User avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <div className="font-medium text-sm">{user.name}</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{role}</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
