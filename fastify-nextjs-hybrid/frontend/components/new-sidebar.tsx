"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  UsersRound,
  Settings,
  CreditCard,
  LogOut
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
  } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Team', href: '/team', icon: UsersRound },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

  export function AppSidebar() {
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex flex-col gap-2 p-4 border-t">
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@company.com</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    )
  }