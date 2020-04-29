const fs = require("fs");

require("ignore-styles");

const processCWD = process.cwd();
let envFile = ".env";
if (fs.existsSync(`${processCWD}/.env.local`)) envFile = ".env.local";
if (fs.existsSync(`${processCWD}/.env.staging`)) envFile = ".env.staging";
if (fs.existsSync(`${processCWD}/.env.production`)) envFile = ".env.production";

require("dotenv").config({ path: envFile });

require("@babel/register")({
  ignore: [/\/(build|node_modules)\//],
  presets: ["react-app"],
});

console.error = () => {};

require("./app");
