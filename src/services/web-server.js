const http = require("http");

let debug = require("debug")("ins:webserver");
const app = require("@/app");

let server;

function start() {
  return new Promise((resolve, reject) => {
    server = http.createServer(app);
    server.listen(process.env.PORT, (err) => {
      if (err) {
        reject(err);
        return;
      }
      debug(`Server started on port ${process.env.PORT}`);
      resolve();
    });
  });
}
module.exports.start = start;

function close() {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
module.exports.close = close;

async function shutdown(e = null) {
  let err = e;
  debug("Shutting down");
  try {
    debug("Closing web server module");
    await close();
  } catch (e) {
    debug("Encountered error", e);
    err = err || e;
  }

  debug("Exiting process");
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}
module.exports.shutdown = shutdown;

process.on("SIGTERM", () => {
  debug("Received SIGTERM");
  shutdown();
});

process.on("uncaughtException", (err) => {
  debug("Uncaught exception");
  debug(err);
  shutdown(err);
});

process.on("unhandledRejection", (err) => {
  debug("Unhandled Rejection");
  debug(err);
  shutdown(err);
});
