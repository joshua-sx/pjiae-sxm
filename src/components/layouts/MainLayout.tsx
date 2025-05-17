
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
            "pt-8 px-6 pb-6", /* Standardized content spacing */
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
