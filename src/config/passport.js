const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("@/db/models/User.js");

module.exports = (passport) => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_ACCESS_KEY;

  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findOne({
        where: { username: payload.username },
        attributes: [["id", "uid"], "username", "email", "role", "status"],
      })
        .then(
          (user) => {
            return done(null, user);
          },
          (err) => {
            return done(err, false);
          }
        )
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
