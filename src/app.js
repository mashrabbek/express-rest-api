const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const loginfo = require("@/middleware/loginfo");

const errorHandlers = require("@/helpers/errors/index");
const swaggerDocs = require("@/helpers/swagger/index");
const endpoints = require("@/api/endpoints.js");

let debug = require("debug")("ins:app");
const app = express();

app.use(cors());
// body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet());

// logger in request
app.use(loginfo);

// morgan console logger in dev mode
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//initializing endpoints
endpoints(app);
// swagger documentation
swaggerDocs(app);
// !!! Error handling
errorHandlers(app);

module.exports = app;
