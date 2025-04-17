import { useSelector } from "react-redux";
import Header from "./Header";

import { Outlet } from "react-router-dom";

const Layout = () => {
  const isSidebarOpen = useSelector((store) => store.sidebar.isSidebarOpen);

  return (
    <>
      <Header />
      <div
        className={`pt-4 transition-all duration-300 ${
          isSidebarOpen ? "ml-52" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
