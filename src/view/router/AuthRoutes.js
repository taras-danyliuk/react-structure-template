import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../Login/Login"


export default function AuthRoutes() {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
    </Switch>
  )
}
