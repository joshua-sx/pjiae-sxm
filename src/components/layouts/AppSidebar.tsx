
import {
  Sidebar,
  SidebarContent as SidebarContentWrapper,
  SidebarFooter as SidebarFooterWrapper,
  SidebarHeader as SidebarHeaderWrapper,
  SidebarRail,
} from '@/components/ui/sidebar';

import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarContent } from './sidebar/SidebarContent';
import { SidebarFooter } from './sidebar/SidebarFooter';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeaderWrapper className="p-0">
        <SidebarHeader />
      </SidebarHeaderWrapper>
      
      <SidebarContentWrapper>
        <SidebarContent />
      </SidebarContentWrapper>
      
      <SidebarFooterWrapper>
        <SidebarFooter />
      </SidebarFooterWrapper>
      
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
