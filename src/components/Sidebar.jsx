import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const isSidebarOpen = useSelector((store) => store.sidebar.isSidebarOpen);
  if (!isSidebarOpen) return null;

  return (
    <div className="w-52 fixed top-16 left-0 h-full bg-white p-4 shadow-sm z-40">
      <ul className="space-y-4 text-sm">
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          <Link to="/">🏠 Home</Link>
        </li>
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          <Link to="/shorts">🎬 Shorts</Link>
        </li>
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          📺 Subscriptions
        </li>
        <hr />
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          📚 Library
        </li>
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          👍 Liked Videos
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
