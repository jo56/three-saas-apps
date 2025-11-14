import { AppSidebar } from './new-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
