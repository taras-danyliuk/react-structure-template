import React from "react";
import { Switch } from "react-router-dom";

import GeneralLayout from "./shared/layouts/GeneralLayout";

import routes from "./routes";


function App() {
  return (
    <Switch>
      {
        routes.map(route => {
          return (
            <route.route
              key={route.path}
              path={route.path}
              exact={route.exact}
              roles={route.roles}
              component={props => {
                const LayoutComponent = route.layout ? route.layout : GeneralLayout;

                return (
                  <LayoutComponent>
                    <route.component {...props}/>
                  </LayoutComponent>
                )
              }}
            />
          )
        })
      }
    </Switch>
  );
}

export default App;
