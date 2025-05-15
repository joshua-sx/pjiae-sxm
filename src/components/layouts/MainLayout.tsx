
import { ReactNode } from 'react';
import TopBar from './TopBar';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { LAYOUT_CONSTANTS } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-pjiae-lightgray flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className={cn(
            "flex-1 overflow-auto",
            `pt-6 px-6 pb-6 mt-[${LAYOUT_CONSTANTS.HEADER_HEIGHT_PX}px]`,
          )}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
