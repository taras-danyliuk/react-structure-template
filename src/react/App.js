import React from "react";
import { Switch, Route } from "react-router-dom";

import GeneralLayout from "./shared/layouts/GeneralLayout";
import routes from "./routes";


function App() {
  return (
    <Switch>
      {
        routes.map(el => {
          const Route = el.route || Route

          return (
            <Route
              key={el.path}
              path={el.path}
              exact={el.exact}
              roles={el.roles}
              component={props => {
                const LayoutComponent = el.layout || GeneralLayout;

                return (
                  <LayoutComponent>
                    <el.component {...props}/>
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
