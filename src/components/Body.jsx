import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import MainContainer from "./MainContainer";
import PlayVideo from "./PlayVideo";
import SearchResult from "./SearchResult";
import ErrorDetails from "./ErrorDetails";
import AuthObserver from "./AuthObserver";

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
        path: "error",
        element: <ErrorDetails />,
      },
    ],
  },
]);

const Body = () => {
  return (
    <div className="flex flex-col">
      <AuthObserver>
        <RouterProvider router={router} />
      </AuthObserver>
    </div>
  );
};

export default Body;
