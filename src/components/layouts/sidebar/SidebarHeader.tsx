
import { useSidebar } from '@/components/ui/sidebar';
import { LAYOUT_CONSTANTS } from '@/lib/utils';

export function SidebarHeader() {
  const { state } = useSidebar();
  
  return (
    <div className={`border-b w-full flex items-center justify-center ${LAYOUT_CONSTANTS.HEADER_HEIGHT} bg-white/5`}>
      <div className="px-6 flex items-center justify-start h-full w-full">
        {state === "expanded" ? (
          <div className="font-bold text-xl text-pjiae-blue">PJIAE</div>
        ) : (
          <div className="w-full flex justify-center">
            <span className="font-bold text-xl text-pjiae-blue">P</span>
          </div>
        )}
      </div>
    </div>
  );
}
