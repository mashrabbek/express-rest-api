const express = require("express");
const router = express.Router();
const MenuController = require("@/api/controllers/menus");
const menuValidator = require("@/api/validators/menus");
const checkValid = require("@/middleware/checkValidation");
const checkAuth = require("@/middleware/checkAuth");

/**
 * get all menus list
 */
router.get("/", checkAuth, MenuController.getMenusList);

/**
 *  get menus belongs to logged user
 */
router.get("/user", checkAuth, MenuController.getUserMenusList);

/**
 *  creating menu
 */
router.post(
  "/",
  checkAuth,
  menuValidator.validate("addMenu"),
  checkValid,
  MenuController.addMenu
);

/**
 * editing existing menu by menu id
 */
router.put(
  "/",
  checkAuth,
  menuValidator.validate("editMenu"),
  checkValid,
  MenuController.editMenu
);

/**
 * delete menu by menu id
 */
router.delete(
  "/",
  checkAuth,
  menuValidator.validate("deleteMenu"),
  checkValid,
  MenuController.deleteMenu
);

module.exports = router;
