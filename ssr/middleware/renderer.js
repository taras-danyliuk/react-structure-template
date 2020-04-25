const path = require("path");
const fs = require("fs");

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import { ChunkExtractor } from "@loadable/server";

// import our main App component
import ssrPromiseHelper from "../../src/helpers/ssrPromiseHelper";

import App from "../../src/react/App";
import configureStore from "../../src/redux/configureStore";


export default (req, res) => {
  // Read and modify index.html file
  const filePath = path.resolve(__dirname, "..", "..", "build", "index.html");
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
      const token = uuidv4();
      store.dispatch({ type: "SET_REQUEST_TOKEN", payload: token });
      store.dispatch({ type: "ALLOWED_SUCCESS", payload: false });


      // Render App to gather API calls into promises
      ssrPromiseHelper.bucket[token] = {
        shouldTrack: true,
        promises: {}
      };

      // Prepare loadable extractor for code splitting
      const statsFile = path.resolve(__dirname, "..", "..", "build", "loadable-stats.json");
      const extractor = new ChunkExtractor({ statsFile });

      console.time('Gathering Requests');
      const context = {};
      ReactDOMServer.renderToString(extractor.collectChunks(
        <Provider store={store}>
          <StaticRouter location={req.baseUrl} context={context}>
            <App/>
          </StaticRouter>
        </Provider>
      ));
      console.timeEnd('Gathering Requests');

      console.time('Waiting for Requests');
      console.log(Object.keys(ssrPromiseHelper.bucket[token].promises));
      // Wait for API calls to finish
      await Promise.all(Object.values(ssrPromiseHelper.bucket[token].promises));

      console.timeEnd('Waiting for Requests');
      // Render App with content
      // eslint-disable-next-line
      ssrPromiseHelper.bucket[token] = {
        shouldTrack: false,
      };

      console.time('Rendering content');
      const html = ReactDOMServer.renderToString(extractor.collectChunks(
        <Provider store={store}>
          <StaticRouter location={req.baseUrl} context={context}>
            <App/>
          </StaticRouter>
        </Provider>
      ));
      console.timeEnd('Rendering content');

      // Clear and reset
      store.dispatch({ type: "SET_REQUEST_TOKEN", payload: "" });
      store.dispatch({ type: "ALLOWED_SUCCESS", payload: true });
      delete ssrPromiseHelper.bucket[token];


      // Prepare head modifications
      const helmet = Helmet.renderStatic();
      const styleTags = extractor.getStyleTags();
      const scriptTags = extractor.getScriptTags();

      // Add head meta
      const fullUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
      const headMeta = [
        '<meta charset="utf-8"/>',
        `<meta property="og:url" content="${fullUrl}"/>`,
        helmet.meta.toString()
      ];
      htmlData = htmlData.replace("<head>", `<head>${headMeta.join("")}`);
      htmlData = htmlData.replace("</head>", `${styleTags}</head>`);

      // Change page title
      const helmetTitle = helmet.title.toString();
      if (helmetTitle.replace(/<.*?>/g, "")) {
        htmlData = htmlData.replace("<title>LoveAntiques.com</title>", helmetTitle);
      }

      // Insert body
      const preloadedState = lodash.cloneDeep(store.getState());

      htmlData = htmlData.replace(
        "<div id=\"root\"></div>",
        `
          <div id="root">${html}</div>
          <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
          ${scriptTags}
        `
      );

      res.cacheControl = { noCache: true };

      return res.send(htmlData);
    }
    catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  });
}
