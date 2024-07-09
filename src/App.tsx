import { FC, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import router from "./routes";

const App: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default App;
