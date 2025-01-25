import { Sidebar } from "@/components/ui/sidebar";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function DashboardSidebar() {
  return (
    <Sidebar>
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  );
}

export default DashboardSidebar;
