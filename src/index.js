import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/styles/index.scss";
import App from "./react/App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/configureStore";


// Prepare Redux store
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const hasSSR = !!preloadedState;
delete window.__PRELOADED_STATE__;


// Render App
const renderFunc = hasSSR ? ReactDOM.hydrate : ReactDOM.render;
renderFunc(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
