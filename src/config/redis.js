const redis = require("redis");

class Redis {
  constructor() {
    this.port = process.env.REDIS_PORT || "6379";
    this.connected = false;
    this.client = null;
  }
  getConnection() {
    if (this.connected) return this.client;
    else {
      this.client = redis.createClient({
        post: this.port,
        host: "redis-server",
        retry_strategy: function (options) {
          if (options.error && options.error.code === "ECONNREFUSED") {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error("The server refused the connection");
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error("Retry time exhausted");
          }
          if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
          }
          // reconnect after
          return Math.min(options.attempt * 100, 3000);
        },
      });
      this.client.on("connect", () => {
        //this.client.stream.setKeepAlive(true, 5000);
        this.connected = true;
      });
      this.client.on("error", (err) => {
        //console.log(error);
        console.error(err);
      });
      return this.client;
    }
  }
}

module.exports = new Redis();
