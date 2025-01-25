import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/general/Navbar/DashboardSidebar";

function DashboardSidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}

export default DashboardSidebarWrapper;
