import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/styles/index.scss";

import App from "./react/App";
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
