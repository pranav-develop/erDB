import DashboardSidebarWrapper from "@/components/general/wrappers/DashboardSidebarWrapper";
import DashboardPageHeader from "./DashboardPageHeader";
import { CLIENT_ROUTES } from "@/types/Routes";
import { Outlet } from "react-router-dom";
import { ReactFlowProvider } from "@xyflow/react";

function DashboardLayout() {
  return (
    <DashboardSidebarWrapper>
      <DashboardPageHeader
        breadcrumbs={[
          { text: "Dashboard", href: CLIENT_ROUTES.DASHBOARD.INDEX },
          { text: "Create" },
        ]}
      />
      <div className="w-full h-[calc(100%-48px)] overflow-x-hidden overflow-y-auto ">
        <ReactFlowProvider>
          <Outlet />
        </ReactFlowProvider>
      </div>
    </DashboardSidebarWrapper>
  );
}

export default DashboardLayout;
