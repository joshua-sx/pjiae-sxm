
import { useSidebar, SidebarTrigger } from '@/components/ui/sidebar';
import { LAYOUT_CONSTANTS } from '@/lib/utils';
import { SidebarRoleSwitcher } from './SidebarRoleSwitcher';

export function SidebarHeader() {
  const { state } = useSidebar();
  
  return (
    <div className={`border-b w-full ${LAYOUT_CONSTANTS.HEADER_HEIGHT} bg-white`}>
      <div className="h-full flex items-center justify-between">
        <div className="px-4 py-4 flex items-center h-full">
          <span className="font-bold text-lg text-pjiae-blue">DAS</span>
        </div>
        
        {/* Role switcher for expanded state */}
        {state === "expanded" && (
          <div className="flex-1 px-2">
            <SidebarRoleSwitcher />
          </div>
        )}
        
        <div className="pr-2 h-full flex items-center">
          {/* Collapsed state role switcher */}
          {state === "collapsed" && (
            <div className="mr-2">
              <SidebarRoleSwitcher />
            </div>
          )}
          <SidebarTrigger className="text-gray-500 hover:text-gray-700" />
        </div>
      </div>
    </div>
  );
}
