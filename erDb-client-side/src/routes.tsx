import { Route, Routes } from "react-router-dom";
import { CLIENT_ROUTES } from "@/types/Routes";
import HomePage from "@/pages/Home";
import DiagramsListPage from "@/pages/Dashboard/Diagrams/DiagramsListPage";
import DiagramsDetailsPage from "@/pages/Dashboard/Diagrams/DiagramsDetailsPage";
import DiagramsCreatePage from "@/pages/Dashboard/Diagrams/DiagramsCreatePage";

function AllRoutes() {
  return (
    <Routes>
      <Route path={CLIENT_ROUTES.INDEX} element={<HomePage />} />
      <Route path={CLIENT_ROUTES.DASHBOARD.INDEX}>
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
