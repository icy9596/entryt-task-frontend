import { createBrowserRouter, type RouteObject } from "react-router-dom";

import BasicLayout from "@/components/layouts/BasicLayout";
import { lazyCom } from "@/components/LazyComponent";
import Auth from "@/components/Auth";

const Index = lazyCom(() => import("@/pages/Index"));
const Login = lazyCom(() => import("@/pages/Login"));
const Register = lazyCom(() => import("@/pages/Register"));

const routes = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Index />,
        handle: { title: "首页", requiredAuth: true },
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    handle: { title: "登录" }
  },
  {
    path: "/register",
    element: <Register />,
    handle: { title: "注册" }
  },
];

const walkRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    const { requiredAuth } = route.handle || {};
    if (requiredAuth && route.element) {
      route.element = <Auth>{route.element}</Auth>;
    }
    if (route.children) {
      route.children = walkRoutes(route.children);
    }
    return route;
  });
};

const router = createBrowserRouter(walkRoutes(routes));

export { routes, router };
