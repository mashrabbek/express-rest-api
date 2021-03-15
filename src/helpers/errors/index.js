const fs = require("fs");
const path = require("path");
const debug = require("debug")("ins:helpers/errors");

module.exports = (app) => {
  try {
    let files = fs.readdirSync(__dirname);
    debug({ files });
    files.forEach((file) => {
      if (file.length > 3 && file.substr(-3) == ".js" && file !== "index.js") {
        let errorFile = file.substr(0, file.length - 3);
        require(`@/helpers/errors/${errorFile}`)(app);
      }
    });
  } catch (err) {
    debug("Could not list the directory.", err);
    throw new Error(err);
  }
};
