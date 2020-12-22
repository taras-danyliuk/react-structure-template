const fs = require("fs");

fs.readFile("package.json", "utf8", function(err, data) {
  const parsedJson = JSON.parse(data);

  fs.writeFileSync('.babelrc', JSON.stringify(parsedJson.babel, null, 2));

  const jestConfig = parsedJson.jest;
  // jestConfig.setupFiles.push("<rootDir>/setupTests.js");
  fs.writeFileSync('jest.config.js', `module.exports = ${JSON.stringify(jestConfig, null, 2)}`);

  delete parsedJson.babel;
  delete parsedJson.jest;
  parsedJson.eslintConfig = { extends: "@coax/eslint-config-fe-react" };

  parsedJson.scripts["test"] = "node scripts/test.js --watchAll=false";
  parsedJson.scripts["test:dev"] = "node scripts/test.js";
  parsedJson.scripts["test:ci"] = "node scripts/test.js --coverage --watchAll=false";

  parsedJson.scripts.coverage = "node scripts/test.js --coverage --watchAll=false";

  parsedJson.scripts["lint"] = "eslint --quiet ./";
  parsedJson.scripts["lint:ci"] = "eslint -f json -o eslint-report.json ./";
  parsedJson.scripts["lint:fix"] = "eslint --fix ./";

  parsedJson["pre-commit"] = ["lint", "test"];

  fs.unlinkSync("package.json");
  fs.writeFileSync("package.json", JSON.stringify(parsedJson, null, 2));
});
