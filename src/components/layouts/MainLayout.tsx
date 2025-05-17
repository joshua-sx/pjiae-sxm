
import { ReactNode } from 'react';
import TopBar from './TopBar';
import AppSidebar from './AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

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
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="bg-pjiae-lightgray">
          <TopBar />
          <main className={cn(
            "flex-1 overflow-auto",
            // Offset content so it sits below the fixed TopBar (height = var(--header-height))
            "pt-[var(--header-height)] px-6 pb-6", 
            !fullWidth && "max-w-screen-2xl mx-auto",
            className
          )}>
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
