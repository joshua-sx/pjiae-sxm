
import * as React from "react"
import { ChevronDown, ChevronsUpDown } from "lucide-react"
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
      <div className="w-full flex justify-center py-2">
        <span className="font-bold text-xl text-pjiae-blue">P</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex flex-col items-start focus:outline-none focus:ring-0">
          <div className="font-bold text-lg text-pjiae-blue">PJIAE</div>
          <div className="flex items-center text-sm text-gray-600">
            <span>Role: </span>
            <span className="pl-1 font-medium">{role}</span>
            <ChevronDown size={14} className="ml-1" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          className="w-[--radix-dropdown-menu-trigger-width] min-w-[14rem]"
          align="start"
          side={isMobile ? "bottom" : "right"}
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Select Role
          </DropdownMenuLabel>
          
          {allRoles.map((roleOption) => (
            <DropdownMenuItem
              key={roleOption}
              onClick={() => setRole(roleOption)}
              className="gap-2 p-2"
            >
              <span className={roleOption === role ? "font-semibold" : ""}>{roleOption}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
