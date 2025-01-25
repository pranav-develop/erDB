import { Route, Routes } from "react-router-dom";
import { CLIENT_ROUTES } from "@/types/Routes";
import HomePage from "@/pages/Home";
import { DashboardLayout } from "./components/general/layouts/DashboardLayout";
import {
  DiagramsCreatePage,
  DiagramsDetailsPage,
  DiagramsListPage,
} from "./pages/Dashboard/Diagrams";
import { DashboardHome } from "./pages/Dashboard/Home";

function AllRoutes() {
  return (
    <Routes>
      <Route path={CLIENT_ROUTES.INDEX} element={<HomePage />} />
      <Route path={CLIENT_ROUTES.DASHBOARD.INDEX} element={<DashboardLayout />}>
        <Route
          path={CLIENT_ROUTES.DASHBOARD.INDEX}
          element={<DashboardHome />}
        />
        <Route
          path={CLIENT_ROUTES.DASHBOARD.DIAGRAMS.INDEX}
          element={<DiagramsListPage />}
        />
        <Route
          path={CLIENT_ROUTES.DASHBOARD.DIAGRAMS.DETAIL}
          element={<DiagramsDetailsPage />}
        />
        <Route
          path={CLIENT_ROUTES.DASHBOARD.DIAGRAMS.CREATE}
          element={<DiagramsCreatePage />}
        />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
