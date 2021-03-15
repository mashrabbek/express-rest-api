const passport = require("passport");
require("@/config/passport")(passport);

module.exports = (req, res, next) => {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    (err, user, info) => {
      //console.log({ err, user, info });
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({
          status: false,
          message: "Unauthorized",
        });
      }

      req.user = user.dataValues; // Forward user information to the next middleware
      next();
    }
  )(req, res, next);
};
