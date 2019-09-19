import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "./shared/header";

import Modal from "./Modal/Modal";
import Home from "./Home/Home";
import Login from "./Login/Login";

import PrivateRoute from "./router/privateRoute"
import PublicRoute from "./router/publicRoute"


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>

        <Router>
          <Switch>
            <PublicRoute path="/login" component={Login}/>
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </Router>

        <Modal/>
      </React.Fragment>
    );
  }
}

export default App;
