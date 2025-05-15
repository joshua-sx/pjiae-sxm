
import { useSidebar } from '@/components/ui/sidebar';

export function SidebarHeader() {
  const { state } = useSidebar();
  
  return (
    <div className="border-b h-16 flex items-center">
      <div className="px-4 flex items-center h-full">
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
