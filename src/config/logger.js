const winston = require("winston");
const moment = require("moment");
const expressWinston = require("express-winston");

let currentDate = moment().format("YYYY/MM/DD");

const infoFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level} ${info.message} ${info.httpRequest.status} ${info.httpRequest.remoteIp} ${info.httpRequest.userAgent} ${info.responseTime}ms`;
  })
);

const errorFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf((error) => {
    return `${error.timestamp} ${error.level} ${error.message}  ${error.httpRequest.remoteIp} ${error.httpRequest.userAgent} ${error.stack} `;
  })
);

const dynamicMeta = (req, res) => {
  const httpRequest = {};
  const meta = {};
  if (req) {
    meta.httpRequest = httpRequest;
    httpRequest.requestMethod = req.method;
    httpRequest.requestUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`;
    httpRequest.protocol = `HTTP/${req.httpVersion}`;
    // httpRequest.remoteIp = req.ip // this includes both ipv6 and ipv4 addresses separated by ':'
    httpRequest.remoteIp =
      req.ip.indexOf(":") >= 0
        ? req.ip.substring(req.ip.lastIndexOf(":") + 1)
        : req.ip; // just ipv4
    httpRequest.requestSize = req.socket.bytesRead;
    httpRequest.userAgent = req.get("User-Agent");
    httpRequest.referrer = req.get("Referrer");
  }

  if (res) {
    meta.httpRequest = httpRequest;
    httpRequest.status = res.statusCode;
    httpRequest.latency = {
      seconds: Math.floor(res.responseTime / 1000),
      nanos: (res.responseTime % 1000) * 1000000,
    };
    if (res.body) {
      if (typeof res.body === "object") {
        httpRequest.responseSize = JSON.stringify(res.body).length;
      } else if (typeof res.body === "string") {
        httpRequest.responseSize = res.body.length;
      }
    }
  }
  return meta;
};

const infoLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: `logs/info/${currentDate}.log`,
    }),
    new winston.transports.Console(),
  ],
  format: infoFormat,
  metaField: null,
  responseField: null,
  dynamicMeta,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      level: "error",
      filename: `logs/error/${currentDate}.log`,
      handleExceptions: true,
    }),
    new winston.transports.Console(),
  ],
  format: errorFormat,
  metaField: null,
  responseField: null,
  dynamicMeta,
});

module.exports = { infoLogger, errorLogger };
