import { useSelector } from "react-redux";
import Header from "./Header";
import Login from "./Login";

import { Outlet } from "react-router-dom";

const Layout = () => {
  const isSidebarOpen = useSelector((store) => store.sidebar.isSidebarOpen);
  const isUserLoggedIn = useSelector((store) => store.user.currentUser);

  if (!isUserLoggedIn) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Login />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        className={`pt-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-52" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
