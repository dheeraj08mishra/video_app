import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import MainContainer from "./MainContainer";
import PlayVideo from "./PlayVideo";
import SearchResult from "./SearchResult";
import ErrorDetails from "./ErrorDetails";
import AuthObserver from "./AuthObserver";
import WatchHistory from "./WatchHistory";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <PlayVideo />,
      },
      {
        path: "/results",
        element: <SearchResult />,
      },
      {
        path: "shorts",
        element: <div>Shorts Page</div>,
      },
      {
        path: "history",
        element: <WatchHistory />,
      },
      {
        path: "error",
        element: <ErrorDetails />,
      },
    ],
  },
]);

const Body = () => {
  const isDarkMode = useSelector((store) => store.toggleDarkMode.darkMode);

  return (
    <div
      className={`flex flex-col h-full ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <AuthObserver>
        <RouterProvider router={router} />
      </AuthObserver>
    </div>
  );
};

export default Body;
