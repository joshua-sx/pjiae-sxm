
import { useSidebar, SidebarTrigger } from '@/components/ui/sidebar';
import { LAYOUT_CONSTANTS } from '@/lib/utils';

export function SidebarHeader() {
  return (
    <div className={`border-b w-full flex items-center justify-between ${LAYOUT_CONSTANTS.HEADER_HEIGHT} bg-white`}>
      <div className="px-4 py-4 flex flex-col justify-center h-full">
        <span className="font-bold text-lg text-pjiae-blue">DAS</span>
      </div>
      <div className="pr-2 h-full flex items-center">
        <SidebarTrigger className="text-gray-500 hover:text-gray-700" />
      </div>
    </div>
  );
}
