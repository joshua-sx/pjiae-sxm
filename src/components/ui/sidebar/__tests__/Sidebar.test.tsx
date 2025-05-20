import React from 'react';
import { render } from '@testing-library/react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('collapsed sidebar centers icons and hides text', () => {
  const { container } = render(
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <svg data-testid="icon" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );

  const button = container.querySelector('[data-sidebar="menu-button"]');
  expect(button).not.toBeNull();
  expect(button!.className).toContain('justify-center');
  expect(button!.className).toContain('[&>span]:group-data-[state=collapsed]:hidden');
});
