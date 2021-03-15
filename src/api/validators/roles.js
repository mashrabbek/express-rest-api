const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "addRole": {
      // authority, name status
      console.log("addRole validation");
      return [
        body("authority", "authority field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is not letters only"),
        body("name").exists().trim().notEmpty().isAlpha(),
        body("status", "field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is not letters only")
          .isLength({ min: 1, max: 1 })
          .withMessage("Lenght Outbound"),
        body("menus", "Field doesnt exist")
          .exists()
          .isArray()
          .withMessage("Field is not array"),
      ];
    }
    case "editRole": {
      console.log("editRole validation");
      return [
        body("id", "Id not exists")
          .exists()
          .isInt()
          .withMessage("Not integer format"),
        body("authority").isAlpha().withMessage("Field is not letters only"),
        body("name").isAlpha().withMessage("Field is not letters only"),
        body("status")
          .isAlpha()
          .withMessage("Field is letters only")
          .isLength({ min: 1, max: 1 })
          .withMessage("Lenght Outbound"),
        body("menus")
          .if(body("menus").exists())
          .isArray()
          .withMessage("Field is not array"),
      ];
    }
    case "deleteRole": {
      console.log("delete validation");
      return [
        query("id", "id not exists")
          .exists()
          .isInt()
          .withMessage("Not integer format"),
      ];
    }
  }
};
