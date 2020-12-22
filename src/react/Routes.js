import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./shared/routes/PrivateRoute";
import PublicRoute from "./shared/routes/PublicRoute";

// Layouts
import GeneralLayout from "./shared/layouts/GeneralLayout";
import AuthLayout from "./shared/layouts/AuthLayout";

// Pages
import NotFound from "./shared/NotFound";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";


function RouteComponent(props) {
  const { isPublic, isPrivate, layout: Layout = GeneralLayout, ...restProps} = props;

  return (
    <Layout>
      {isPublic && <PublicRoute {...restProps}/>}
      {isPrivate && <PrivateRoute {...restProps}/>}
      {!isPublic && !isPrivate && <Route {...restProps}/>}
    </Layout>
  )
}


function Routes() {
  return (
    <Switch>
      {/*All Users*/}
      <RouteComponent path="/" exact component={Home}/>

      {/*Not Authorized users only - PublicRoute component*/}
      <RouteComponent path="/login" component={Login} isPublic layout={AuthLayout}/>

      {/*Authorized users only - PrivateRoute component*/}
      <RouteComponent path="/profile" component={Profile} isPrivate/>

      {/*404 Not Found route*/}
      <RouteComponent path="*" component={NotFound}/>
    </Switch>
  )
}

export default Routes;
