
import { ReactNode } from 'react';
import TopBar from './TopBar';
import AppSidebar from './AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { LAYOUT_CONSTANTS } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="bg-pjiae-lightgray">
          <TopBar />
          <main className={cn(
            "flex-1 overflow-auto",
            `pt-8 px-6 pb-6 mt-[${LAYOUT_CONSTANTS.HEADER_HEIGHT_PX}px]`,
          )}>
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
