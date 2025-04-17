import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import MainContainer from "./MainContainer";

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
        path: "shorts",
        element: <div>Shorts Page</div>,
      },
    ],
  },
]);

const Body = () => {
  return (
    <div className="flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default Body;
