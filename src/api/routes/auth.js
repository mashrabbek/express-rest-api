const router = require("express").Router();

const authValidator = require("@/api/validators/auth");
const checkValid = require("@/middleware/checkValidation");
const AuthController = require("@/api/controllers/auth");
const checkAuth = require("@/middleware/checkAuth");

/**
 *  login
 */
router.post(
  "/login",
  authValidator.validate("loginUser"),
  checkValid,
  AuthController.loginUser
);

/**
 *  refresh token
 */
router.post(
  "/token",
  authValidator.validate("refreshToken"),
  checkValid,
  AuthController.refreshToken
);

/**
 * delete token
 */
router.delete(
  "/token",
  checkAuth,
  authValidator.validate("deleteToken"),
  checkValid,
  AuthController.deleteToken
);

module.exports = router;
