require("module-alias/register");
require("@/config/index");

const logger = require("@/config/logger");

let debug = require("debug")("ins:index");
const webServer = require("@/services/web-server");

async function startup() {
  let startTime = Date.now();
  debug("starting application");
  try {
    debug("starting the server");
    await webServer.start();
    debug("server started in " + (Date.now() - startTime) / 1000 + " seconds.");
  } catch (err) {
    logger.error(`${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`);
    debug(err);
    process.exit(1); // Non-zero failure code
  }
}

startup();
