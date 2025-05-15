
import { useSidebar } from '@/components/ui/sidebar';
import { LAYOUT_CONSTANTS } from '@/lib/utils';

export function SidebarHeader() {
  const { state } = useSidebar();
  
  return (
    <div className={`border-b w-full flex items-center ${LAYOUT_CONSTANTS.HEADER_HEIGHT}`}>
      <div className="px-4 flex items-center h-full w-full">
        {state === "expanded" ? (
          <div className="font-bold text-xl text-blue-600">PJIAE</div>
        ) : (
          <div className="w-full flex justify-center">
            <span className="font-bold text-xl text-blue-600">P</span>
          </div>
        )}
      </div>
    </div>
  );
}
