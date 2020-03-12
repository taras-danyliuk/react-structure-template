import React from "react";
import { Route } from "react-router-dom";

import PrivateRoute from "./shared/routes/PrivateRoute";
import PublicRoute from "./shared/routes/PublicRoute";

// Layouts
import AuthLayout from "./shared/layouts/AuthLayout";

const NotFound = React.lazy(() => import("./shared/NotFound"));
const Home = React.lazy(() => import("./Home/Home"));
const Login = React.lazy(() => import("./Login/Login"));
const Profile = React.lazy(() => import("./Profile/Profile"));


const routes = [
  // All users
  { path: "/", exact: true, component: Home, route: Route },

  // Not Authorized users only - PublicRoute component
  // NOTE: you can pass layout prop. This layout component will wrapper your route component
  { path: "/login", component: Login, route: PublicRoute, layout: AuthLayout },

  // Authorized users only - PrivateRoute component
  // NOTE: Can be restricted by passing roles array - roles: ["Admin"]
  { path: "/profile", component: Profile, route: PrivateRoute },

  // 404 Not Found route
  { path: "*", component: NotFound, route: Route },
];

export default routes;
