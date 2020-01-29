import React from "react";
import { Route, Switch } from "react-router-dom";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";


function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact render={() => <div>Home</div>}/>

      <PublicRoute path="/auth" component={AuthRoutes}/>
      <PrivateRoute path="/" component={UserRoutes} />

      <Route path="/not-found" render={() => <div>404 Not Found</div>}/>
    </Switch>
  )
}

export default AppRoutes;
