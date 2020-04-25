import express from "express";
import cacheControl from "express-cache-controller";
import cookiesMiddleware from "universal-cookie-express";
import compression from "compression";

import serverRenderer from "./middleware/renderer";


const PORT = process.env.PORT || 3000;
const path = require("path");

// initialize the application and create the routes
const app = express();
const router = express.Router();

// Disable cache
app.use(cacheControl());
app.use(cookiesMiddleware());

// Gzip
app.use(compression());


// other static resources should just be served as they are
router.use(express.static(
  path.resolve(__dirname, "..", "build"),
  { maxAge: "30d", index: false },
));

// Process all requests with SSR
router.use("*", serverRenderer);


// tell the app to use the above rules
app.use(router);

// start the app
app.listen(PORT, error => {
  console.log(`listening on: ${PORT}`);
  if (error) console.log("something bad happened", error);
});
