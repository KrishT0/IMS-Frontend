import { FC, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./utils/ProtectedRoute";

const Root = lazy(() => import("./layout/Root"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Login = lazy(() => import("./pages/login/Login"));
const Home = lazy(() => import("./pages/Home/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default App;
