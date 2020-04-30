const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("src/redux/rootReducer.js")
});


const fileName = "src/redux/copy-rootReducer.js";

try {
  let addedImport = false;
  let addedReducer = false;

  lineReader.on("line", function (line) {
    // Add reducer row
    if (line.includes("});") && !addedReducer) {
      addedReducer = true;
      fs.appendFileSync(fileName, "  ssr,\n");
    }

    fs.appendFileSync(fileName, `${line}\n`);

    // Add import row
    if (line.includes("./") && !addedImport) {
      addedImport = true;
      fs.appendFileSync(fileName, "import ssr from \"./ssr/ssrReducer\";\n");
    }
  });

  lineReader.on("close", function() {
    fs.unlinkSync("src/redux/rootReducer.js");
    fs.renameSync(fileName, "src/redux/rootReducer.js");
  });

}
catch(err) {}
