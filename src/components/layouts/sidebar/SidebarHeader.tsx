
import { useSidebar } from '@/components/ui/sidebar';
import { LAYOUT_CONSTANTS } from '@/lib/utils';
import { SidebarRoleSwitcher } from './SidebarRoleSwitcher';

export function SidebarHeader() {
  const { state } = useSidebar();
  
  return (
    <div className={`border-b w-full flex items-center justify-between ${LAYOUT_CONSTANTS.HEADER_HEIGHT} bg-white`}>
      <div className="px-4 py-4 flex flex-col justify-center h-full">
        <span className="font-bold text-lg text-pjiae-blue">DAS</span>
      </div>
      
      {state === "expanded" && (
        <div className="pr-4">
          <SidebarRoleSwitcher />
        </div>
      )}
    </div>
  );
}
