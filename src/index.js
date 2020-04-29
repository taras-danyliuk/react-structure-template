import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/styles/index.scss";
import App from "./react/App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/configureStore";


const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();