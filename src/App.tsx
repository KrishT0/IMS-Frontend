import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        path: "/",
        element: <Login />,
      },
      {
        path: "/details",
        element: <div>details</div>,
      },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};
export default App;
