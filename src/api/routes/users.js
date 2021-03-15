const express = require("express");
const router = express.Router();
const UserController = require("@/api/controllers/users");

const userValidator = require("@/api/validators/users");
const checkValid = require("@/middleware/checkValidation");
const checkAuth = require("@/middleware/checkAuth");

/**
 *  get all users list
 */
router.get("/", UserController.getUsersList);

/**
 *  add user
 */
router.post(
  "/",
  checkAuth,
  userValidator.validate("addUser"),
  checkValid,
  UserController.addUser
);

/**
 * edit users data
 */
router.put(
  "/",
  checkAuth,
  userValidator.validate("editUser"),
  checkValid,
  UserController.editUser
);

/**
 * delete a user
 */
router.delete(
  "/",
  checkAuth,
  userValidator.validate("deleteUser"),
  checkValid,
  UserController.deleteUser
);

module.exports = router;
