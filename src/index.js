import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./assets/styles/index.scss";
import App from "./view/App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/configureStore";


const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
