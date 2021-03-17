const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "loginUser": {
      // code, branch, name, username, password
      return [
        body("username", "field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty"),
        body("password", "Field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty"),
      ];
    }
    case "refreshToken": {
      return [
        body("accessToken", "Field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty"),
      ];
    }
    case "deleteToken": {
      return [
        body("accessToken", "Field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty"),
      ];
    }
  }
};
