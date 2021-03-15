const dotenv = require("dotenv");

try {
  const result = dotenv.config();
  if (result.error) {
    throw new Error(result.error);
  }
} catch (err) {}

module.exports = dotenv;
