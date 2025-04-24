import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const isSidebarOpen = useSelector((store) => store.sidebar.isSidebarOpen);
  const isDarkMode = useSelector((store) => store.toggleDarkMode.darkMode);
  if (!isSidebarOpen) return null;
  return (
    // on dark mode, change the background color to gray-800
    <div
      className={`w-52 fixed top-16 left-0 h-full p-4 shadow-sm z-40 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <div className="w-52 fixed top-16 left-0 h-full p-4 shadow-sm z-40">
        <ul className="space-y-4 text-sm">
          <li
            className={
              isDarkMode
                ? "hover:bg-gray-800 p-2 rounded cursor-pointer"
                : "hover:bg-gray-100 p-2 rounded cursor-pointer"
            }
          >
            <Link to="/">🏠 Home</Link>
          </li>
          <li
            className={
              isDarkMode
                ? "hover:bg-gray-800 p-2 rounded cursor-pointer"
                : "hover:bg-gray-100 p-2 rounded cursor-pointer"
            }
          >
            <Link to="/shorts">🎬 Shorts</Link>
          </li>
          <li
            className={
              isDarkMode
                ? "hover:bg-gray-800 p-2 rounded cursor-pointer"
                : "hover:bg-gray-100 p-2 rounded cursor-pointer"
            }
          >
            📺 Subscriptions
          </li>
          <hr />
          <li
            className={
              isDarkMode
                ? "hover:bg-gray-800 p-2 rounded cursor-pointer"
                : "hover:bg-gray-100 p-2 rounded cursor-pointer"
            }
          >
            <Link to="/history">🕒 Watch History</Link>
          </li>
          <li
            className={
              isDarkMode
                ? "hover:bg-gray-800 p-2 rounded cursor-pointer"
                : "hover:bg-gray-100 p-2 rounded cursor-pointer"
            }
          >
            👍 Liked Videos
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
