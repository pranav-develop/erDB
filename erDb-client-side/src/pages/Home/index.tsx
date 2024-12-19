import { CLIENT_ROUTES } from "@/types/Routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(CLIENT_ROUTES.DASHBOARD.DIAGRAMS.INDEX);
  }, []);

  return <div>This is homepage</div>;
}

export default HomePage;
