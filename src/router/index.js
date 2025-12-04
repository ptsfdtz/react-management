import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Mall from "../pages/mall";
import User from "../pages/user";
import PageOne from "../pages/other/pageOne";
import PageTwo from "../pages/other/pageTwo";
const routes = [
  {
    path: "/",
    Component: Main,
    children: [
      //重定向
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "mall",
        Component: Mall,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "other",
        children: [
          {
            path: "PageOne",
            Component: PageOne,
          },
          {
            path: "PageTwo",
            Component: PageTwo,
          },
        ],
      },
    ],
  },
];

const basename =
  process.env.NODE_ENV === "production" ? "/react-management" : undefined;

export default createBrowserRouter(routes, { basename });
