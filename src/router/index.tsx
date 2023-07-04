import { createBrowserRouter } from "react-router-dom";

import BasicLayout from "@/components/layouts/BasicLayout";
import { lazyCom } from "@/components/LazyComponent";

const Index = lazyCom(() => import("@/pages/Index"));
const Login = lazyCom(() => import("@/pages/Login"));
const Register = lazyCom(() => import("@/pages/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [{ index: true, element: <Index /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
