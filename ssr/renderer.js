const path = require("path");
const fs = require("fs");

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";

import App from "../src/react/App";
import configureStore from "../src/redux/configureStore";


export default (req, res) => {
  const injectHTML = (data, { html, title, meta, body, scripts = "", styles = "", state }) => {
    data = data.replace("<html>", `<html ${html}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace("</head>", `${meta}</head>`);
    data = data.replace("</head>", `${styles}</head>`);
    data = data.replace(
      `<div id="root"></div>`,
      `<div id="root">${body}</div>`
    );
    data = data.replace("</body>", `${scripts}<script>window.__PRELOADED_STATE__ = ${state}</script></body>`);

    return data;
  };

  // Read and modify index.html file
  const filePath = path.resolve(__dirname, "..", "build", "index.html");
  fs.readFile(filePath, "utf8", async (err, htmlData) => {
    if (err) return res.status(404).end();

    try {
      // Prepare Redux State
      const store = configureStore();
      const logginedUser = req.universalCookies.get("user");

      if (logginedUser && logginedUser.id) {
        store.dispatch({ type: "LOGIN_REQUEST_SUCCESS" });
      }

      // Request unique token
      store.dispatch({ type: "TOGGLE_SHOULD_TRACK", payload: true });

      // Render App to gather API calls into promises
      const context = {};
      ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.originalUrl} context={context}>
            <App/>
          </StaticRouter>
        </Provider>
      );

      // App triggered a redirect
      if (context.url) return res.redirect(context.url)

      // Wait for API calls to finish
      await Promise.all(Object.values(store.getState().ssr.promises));
      store.dispatch({ type: "TOGGLE_SHOULD_TRACK", payload: false });

      // Render App with content
      const htmlContent = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.originalUrl} context={context}>
            <App/>
          </StaticRouter>
        </Provider>
      );

      // App triggered a redirect
      if (context.url) return res.redirect(context.url)

      // Clear and reset
      store.dispatch({ type: "RESET_PROMISES" });

      // All together
      const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
      const helmet = Helmet.renderStatic();
      const reduxState = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
      const metaTags = [
        `<meta property="og:url" content="${fullUrl}"/>`,
        helmet.meta.toString()
      ]

      // Pass all this nonsense into our HTML formatting function above
      const html = injectHTML(htmlData, {
        html: helmet.htmlAttributes.toString(),
        title: helmet.title.toString(),
        meta: metaTags.join(""),
        body: htmlContent,
        state: reduxState
      });

      return res.send(html);
    }
    catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  });
}
