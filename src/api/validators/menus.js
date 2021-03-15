const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "addMenu": {
      // parentId, name, url, ord, status, createdBy
      return [
        body("parentId").custom((val) => {
          if (val === null || val.match(/\d/)) {
            return true;
          } else {
            throw new Error("Invalid parent Id");
          }
        }),
        body("name", "Field not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),

        body("url", "Field doest not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .custom((val) => {
            if (!val.match(/^\/[a-zA-Z0-9_\/]+/)) {
              throw new Error("Url doesnt match");
            }
            return true;
          }),

        body("ord", "Field doest not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isInt()
          .withMessage("Field is numerics only"),

        body("status", "Field doest not exist")
          .exists()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),
      ];
    }
    case "editMenu": {
      return [
        body("id", "Id not exists")
          .exists()
          .isInt()
          .withMessage("Not integer format"),
        body("parentId").custom((val) => {
          if (val === null || val.match(/\d/)) {
            return true;
          } else {
            throw new Error("Invalid parent Id");
          }
        }),

        body("name")
          .if(body("name").exists())
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),

        body("url")
          .if(body("url").exists())
          .isString()
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .custom((val) => {
            if (!val.match(/^\/[a-zA-Z0-9_\/]+/)) {
              throw new Error("Url doesnt match");
            }
            return true;
          }),

        body("ord")
          .if(body("ord").exists())
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isInt()
          .withMessage("Field is numerics only"),

        body("status")
          .if(body("status").exists())
          .trim()
          .notEmpty()
          .withMessage("Field Is Empty")
          .isAlpha()
          .withMessage("Field is letters only"),
      ];
    }
    case "deleteMenu": {
      console.log("delete validation");
      return [
        query("id", "Id does not exists")
          .exists()
          .isInt()
          .withMessage("Not integer format"),
      ];
    }
  }
};
