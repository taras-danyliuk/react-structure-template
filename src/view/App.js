import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "./shared/Header";
import Modal from "./Modal/Modal";

import PrivateRoute from "./router/PrivateRoute"
import PublicRoute from "./router/PublicRoute"
import AuthRoutes from "./router/AuthRoutes";
import UserRoutes from "./router/UserRoutes";


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>

        <Router>
          <Switch>
            <PublicRoute path="/auth" component={AuthRoutes}/>
            <PrivateRoute path="/" component={UserRoutes} />
          </Switch>
        </Router>

        <Modal/>
      </React.Fragment>
    );
  }
}

export default App;
