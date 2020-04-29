const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("config/webpack.config.js")
});

const fileName = "config/copy-webpack.config.js";

try {
  let firstRequireMet = false;
  let isInLinterBlock = false;

  lineReader.on("line", function (line) {
    if (line.includes("require") && !firstRequireMet) {
      firstRequireMet = true;
      fs.appendFileSync(fileName, "const CopyPlugin = require('copy-webpack-plugin');\n");
    }

    // Comment linter lines
    if (isInLinterBlock) fs.appendFileSync(fileName, "//");

    fs.appendFileSync(fileName, `${line}\n`);

    // Start of Linter Block
    if (line.includes("First, run the linter.")) isInLinterBlock = true;

    // End of Linter Block;
    if (line === "        }," && isInLinterBlock) isInLinterBlock = false;

    if (line === "    plugins: [") {
      fs.appendFileSync(fileName, "      new CopyPlugin([{ from: 'src/assets/images', to: 'images' }]),\n");
    }
  });

  lineReader.on("close", function() {
    console.log("We are done");

    fs.unlinkSync("config/webpack.config.js");
    fs.renameSync(fileName, "config/webpack.config.js");
  });

}
catch(err) {}
