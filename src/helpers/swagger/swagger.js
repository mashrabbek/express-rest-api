const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "RESTful APIs",
      version: "1.0.0",
      description: "REST API Service",
    },
    basePath: "/",
  },
  apis: ["./src/helpers/swagger/docs/*.yaml"],
};

const specs = swaggerDoc(options);

const swaggerJson = (app) => {
  app.get("/api/json", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
    next();
  });
};

const swaggerDocRun = (app) => {
  app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));
};

module.exports = {
  swaggerJson,
  swaggerDocRun,
};
