const fs = require("fs");

fs.readFile("package.json", "utf8", function(err, data) {
  const parsedJson = JSON.parse(data);

  parsedJson.scripts["ssr"] = "npm run build && NODE_ENV=test node ssr";
  parsedJson.scripts["ssr:dev"] = "NODE_ENV=test node ssr";

  fs.unlinkSync("package.json");
  fs.writeFileSync("package.json", JSON.stringify(parsedJson, null, 2));
});
