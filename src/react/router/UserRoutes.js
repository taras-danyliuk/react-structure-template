import React from "react";
import { Route, Switch } from "react-router-dom";

import UserLayout from "../layout/UserLayout";

import UserHome from "../UserHome/UserHome";


export default function UserRoutes() {
  return (
    <UserLayout>
      <Switch>
        <Route path="/" component={UserHome} />
      </Switch>
    </UserLayout>
  )
}
