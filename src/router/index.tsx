import { createBrowserRouter } from "react-router-dom";

import BasicLayout from "@/components/layouts/BasicLayout";
import LazyComponent from "@/components/LazyComponent";

const Index = <LazyComponent factory={() => import("@/pages/Index")} />;
const Login = <LazyComponent factory={() => import("@/pages/Login")} />;
const Register = <LazyComponent factory={() => import("@/pages/Register")} />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: Index },
      { path: "login", element: Login },
      { path: "register", element: Register },
    ],
  },
]);

export default router;
