import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomTabs from "./MobileBottomTabs";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-4">
        <Outlet />
      </main>
      <MobileBottomTabs />
      <Footer />
    </>
  );
};

export default UserLayout;
