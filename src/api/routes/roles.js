const express = require("express");
const router = express.Router();
const RoleController = require("@/api/controllers/roles");
const roleValidator = require("@/api/validators/roles");
const checkValid = require("@/middleware/checkValidation");
const checkAuth = require("@/middleware/checkAuth");

/**
 * get all roles list
 */
router.get("/", RoleController.getRolesList);

/**
 * adding new role
 */
router.post(
  "/",
  checkAuth,
  roleValidator.validate("addRole"),
  checkValid,
  RoleController.addRole
);

/**
 * edit existing role
 */
router.put(
  "/",
  checkAuth,
  roleValidator.validate("editRole"),
  checkValid,
  RoleController.editRole
);

/**
 * delete role
 */
router.delete(
  "/",
  checkAuth,
  roleValidator.validate("deleteRole"),
  checkValid,
  RoleController.deleteRole
);

module.exports = router;
