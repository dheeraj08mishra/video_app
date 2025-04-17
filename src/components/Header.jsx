import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/redux/sidebarSlice";
const Header = () => {
  const dispatch = useDispatch();
  const toggleSideBar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 shadow-md sticky top-0 bg-white z-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSideBar}
            className="text-xl px-2 cursor-pointer"
          >
            ≣
          </button>
          <img
            className="w-24"
            src="https://www.gstatic.com/youtube/img/promos/growth/b337061115c0cba2c061eeb6dc208053b439bbeabc4a49c0374f4687dd27cf8c_244x112.webp"
            alt="logo"
          />
        </div>

        {/* Search */}
        <div className="flex flex-grow max-w-xl mx-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-full focus:outline-none"
            placeholder="Search"
          />
          <button className="bg-gray-200 px-4 rounded-r-full border border-gray-300">
            🔍
          </button>
        </div>

        {/* Right Icons (optional later) */}
        <div className="flex space-x-4 items-center">
          {/* <button>🎥</button>
          <button>🔔</button> */}
          {/* <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/32"
            alt="user"
          /> */}
        </div>
      </div>

      <Sidebar />
    </>
  );
};
export default Header;
