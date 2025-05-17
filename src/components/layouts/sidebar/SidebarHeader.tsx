
import { useSidebar } from '@/components/ui/sidebar';
import { LAYOUT_CONSTANTS } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SidebarHeader() {
  const { state } = useSidebar();
  const { role, setRole } = useAuth();
  
  // Define available roles for the dropdown
  const allRoles = [
    UserRole.EMPLOYEE,
    UserRole.SUPERVISOR,
    UserRole.DIRECTOR,
    UserRole.HR_OFFICER,
    UserRole.IT_ADMIN,
  ];
  
  const handleRoleChange = (newRole: string) => {
    setRole(newRole as UserRole);
  };
  
  return (
    <div className={`border-b w-full flex items-center ${LAYOUT_CONSTANTS.HEADER_HEIGHT} bg-white/5`}>
      <div className="px-4 flex flex-col justify-center h-full w-full">
        {state === "expanded" ? (
          <>
            <div className="font-bold text-lg text-pjiae-blue">PJIAE</div>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger className="mt-2 h-8 text-sm border-0 bg-transparent p-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <div className="flex items-center text-sm text-gray-600">
                  <span>Role: </span>
                  <SelectValue placeholder="Select role" className="pl-1" />
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {allRoles.map((roleOption) => (
                  <SelectItem key={roleOption} value={roleOption}>{roleOption}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <span className="font-bold text-xl text-pjiae-blue">P</span>
          </div>
        )}
      </div>
    </div>
  );
}
