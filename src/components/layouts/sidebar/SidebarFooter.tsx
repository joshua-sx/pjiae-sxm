
import { useSidebar } from '@/components/ui/sidebar';

export function SidebarFooter() {
  const { state } = useSidebar();
  
  return (
    <div className="border-t py-3">
      {state === "expanded" && (
        <div className="px-4 mt-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} PJIAE</p>
          <p>Digital Appraisal System v1.0</p>
        </div>
      )}
    </div>
  );
}
