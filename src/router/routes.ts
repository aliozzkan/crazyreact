import { Route } from "react-router-dom";
import { mainPaths } from "./path";

export const routes: any[] = [
  {
    route: Route,
    name: "Home",
    component: require("pages/Home").default,
    path: mainPaths.Home,
    exact: true,
  },
];

export const authRoutes: any[] = [
  {
    route: Route,
    name: "Login",
    component: require("pages/Login").default,
  },
];
