
import { ReactNode } from 'react';
import TopBar from './TopBar';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

/**
 * MainLayout - Application's primary layout structure
 * 
 * Provides consistent page structure with sidebar, topbar,
 * and main content area with standardized spacing
 * 
 * @param children - Page content
 * @param fullWidth - If true, content will expand to full width of container (no max-width)
 * @param className - Optional additional classes
 */
const MainLayout = ({ children, fullWidth = false, className }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={true}>
      {/* Grid layout: sidebar column + main content column */}
      <div className="min-h-screen grid grid-cols-[var(--sidebar-width)_1fr]">
        {/* Sidebar takes first column */}
        <AppSidebar />
        
        {/* Main content area takes second column */}
        <div className="flex flex-col bg-pjiae-lightgray">
          {/* TopBar spans full width of second column */}
          <TopBar />
          
          {/* Scrollable content area */}
          <main className={cn(
            "flex-1 overflow-auto",
            // Offset content so it sits below the fixed TopBar
            "pt-[var(--header-height)]", 
            // Consistent padding on all screen sizes
            "px-4 md:px-6 pb-6",
            // Align content based on screen size
            !isMobile && "flex flex-col items-start",
            !fullWidth && "max-w-screen-2xl mx-auto w-full",
            className
          )}>
            {/* Content container */}
            <div className="w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
