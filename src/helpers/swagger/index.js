const { swaggerJson, swaggerDocRun } = require("./swagger");
module.exports = (app) => {
  swaggerJson(app);
  swaggerDocRun(app);
};
