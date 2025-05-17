
import * as React from "react"
import { ChevronDown, User } from "lucide-react"
import { useAuth, UserRole } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip"

export function SidebarRoleSwitcher() {
  const { isMobile, state } = useSidebar()
  const { role, setRole } = useAuth()

  // Define available roles for the dropdown
  const allRoles = [
    UserRole.EMPLOYEE,
    UserRole.SUPERVISOR,
    UserRole.DIRECTOR,
    UserRole.HR_OFFICER,
    UserRole.IT_ADMIN,
  ]

  // If sidebar is collapsed, show a more compact version
  if (state === "collapsed" && !isMobile) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="w-full flex justify-center py-3 cursor-pointer hover:bg-gray-100 rounded-md" 
              aria-label="Switch role" 
              role="button"
              tabIndex={0}
              onClick={() => document.getElementById("role-trigger")?.click()}
            >
              <User size={20} className="text-pjiae-blue" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            Current Role: {role}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className="w-full px-4">
      <DropdownMenu>
        <DropdownMenuTrigger 
          id="role-trigger"
          className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-0"
        >
          <div className="flex items-center gap-2">
            <User size={20} className="text-pjiae-blue" />
            <div className="flex flex-col items-start">
              <span className="font-medium text-sm text-pjiae-blue">PJIAE</span>
              <span className="text-xs text-gray-600">{role}</span>
            </div>
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          className="w-[--radix-dropdown-menu-trigger-width] min-w-[14rem]"
          align="end" 
          side={isMobile ? "bottom" : "top"}
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Select Role
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {allRoles.map((roleOption) => (
            <DropdownMenuItem
              key={roleOption}
              onClick={() => setRole(roleOption)}
              className="gap-2 p-2"
            >
              <span className={roleOption === role ? "font-semibold" : ""}>{roleOption}</span>
              {roleOption === role && (
                <span className="ml-auto h-2 w-2 rounded-full bg-pjiae-blue"></span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

