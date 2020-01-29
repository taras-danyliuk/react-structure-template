import React from "react";
import { Route, Switch } from "react-router-dom";

import UserLayout from "../layout/UserLayout";

import Home from "../Home/Home";


export default function UserRoutes() {
  return (
    <UserLayout>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </UserLayout>
  )
}
