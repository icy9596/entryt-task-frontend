import { createBrowserRouter } from "react-router-dom";

import BasicLayout from "@/components/layouts/BasicLayout";
import { lazyCom } from "@/components/LazyComponent";

const Index = lazyCom(() => import("@/pages/Index"));
const Login = lazyCom(() => import("@/pages/Login"));
const Register = lazyCom(() => import("@/pages/Register"));

const routes = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [{ path: "/", title: "首页", index: true, element: <Index /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

const router = createBrowserRouter(routes);

export { routes, router };
