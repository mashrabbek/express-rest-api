const winston = require("winston");
const moment = require("moment");

let currentDate = moment().format("YYYY/MM/DD");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level} ${info.message}`
  )
);
const logger = winston.createLogger({
  levels,
  format,
  transports: [
    new winston.transports.File({
      level: "info",
      filename: `../../logs/info/${currentDate}.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.File({
      level: "error",
      filename: `../../logs/error/${currentDate}.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
