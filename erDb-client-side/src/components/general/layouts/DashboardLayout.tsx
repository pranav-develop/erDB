import DashboardSidebarWrapper from "../Navbar/DashboardSidebar/DashboardSidebarWrapper";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardSidebarWrapper>{children}</DashboardSidebarWrapper>
    </div>
  );
}

export default DashboardLayout;
