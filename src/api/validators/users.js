const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "addUser": {
      // username, password, fio, email, role, status
      return [
        body("username", "username field exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),
        body("password", "password field exist")
          .exists()
          .notEmpty()
          .withMessage("Field Is Empty")
          .trim(),
        body("fio", "field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),
        body("email", "Field doesnt exist")
          .exists()
          .trim()
          .isEmail()
          .withMessage("Field is not email"),
        body("role", "role field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),
        body("status", "status field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only")
          .isLength({ min: 1, max: 1 })
          .withMessage("Lenght Outbound"),
      ];
    }
    case "editUser": {
      console.log("editRole validation");
      return [
        body("id", "Id not exists")
          .exists()
          .isInt()
          .withMessage("Not integer format"),
        body("username", "username field exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),
        body("password")
          .if(body("password").exists())
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty"),

        body("fio")
          .if(body("fio").exists())
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),
        body("email", "Field doesnt exist")
          .if(body("email").exists())
          .trim()
          .isEmail()
          .withMessage("Field is not email"),
        body("role", "role field not exist")
          .if(body("role").exists())
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),
        body("status", "status field not exist")
          .if(body("status").exists())
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only")
          .isLength({ min: 1, max: 1 })
          .withMessage("Lenght Outbound"),
      ];
    }
    case "deleteUser": {
      console.log("delete validation");
      return [
        query("id", "id not exists")
          .exists()
          .isUUID()
          .withMessage("Incorrect format"),
      ];
    }
  }
};
