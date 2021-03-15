const fs = require("fs");
const path = require("path");
const debug = require("debug")("ins:api/endpoints");

let endpoints = (app) => {
  try {
    let files = fs.readdirSync(path.join(__dirname, "routes"));
    debug({ files });
    files.forEach((file) => {
      if (file.length > 3 && file.substr(-3) == ".js") {
        let route = file.substr(0, file.length - 3);
        app.use(`/${route}`, require(`@/api/routes/${route}`));
      }
    });
  } catch (err) {
    debug("Could not list the directory.", err);
    throw new Error(err);
  }
};

module.exports = endpoints;
