
import {
  Sidebar,
  SidebarContent as SidebarContentWrapper,
  SidebarFooter as SidebarFooterWrapper,
  SidebarHeader as SidebarHeaderWrapper,
} from '@/components/ui/sidebar';

import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarContent } from './sidebar/SidebarContent';
import { SidebarFooter } from './sidebar/SidebarFooter';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeaderWrapper>
        <SidebarHeader />
      </SidebarHeaderWrapper>
      
      <SidebarContentWrapper>
        <SidebarContent />
      </SidebarContentWrapper>
      
      <SidebarFooterWrapper>
        <SidebarFooter />
      </SidebarFooterWrapper>
    </Sidebar>
  );
}

export default AppSidebar;
