
import { useSidebar } from '@/components/ui/sidebar';
import { LAYOUT_CONSTANTS } from '@/lib/utils';
import { SidebarRoleSwitcher } from './SidebarRoleSwitcher';

export function SidebarHeader() {
  return (
    <div className={`border-b w-full flex items-center ${LAYOUT_CONSTANTS.HEADER_HEIGHT} bg-white/5`}>
      <div className="px-4 flex flex-col justify-center h-full w-full">
        <SidebarRoleSwitcher />
      </div>
    </div>
  );
}
