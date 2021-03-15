require("module-alias/register");
require("@/config/dotenv");
// run redis server connection check
require("@/config/redis");

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
    debug(err);
    process.exit(1); // Non-zero failure code
  }
}

startup();
