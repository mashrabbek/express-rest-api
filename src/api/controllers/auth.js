//
const User = require("@/db/models/User");
const {
  generateRefreshToken,
  generateAccessToken,
  isTokenExpired,
  refreshAccessToken,
} = require("@/utils/auth");
const RedisService = require("@/services/redis.service");
const bcrypt = require("bcryptjs");
const { decode } = require("jsonwebtoken");

let debug = require("debug")("ins:controllers/auth");

/**
 *  login endpoind to user by usernane, password
 */
exports.loginUser = async (req, res) => {
  //
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ where: { username: username } });

    // if user not exists return error
    if (!user)
      return res
        .status(401)
        .send({ status: -1, message: "Incorrect Username or Password" });

    let result = bcrypt.compareSync(password, user.password);

    if (result) {
      let payload = {
        username: user.username,
        id: user.id,
        role: user.role,
      };

      let refreshToken = generateRefreshToken(payload);
      let accessToken = generateAccessToken(payload, refreshToken);

      // response to return user
      const responseUser = {
        status: 1,
        accessToken: accessToken,
      };

      let key = user.id;
      let responseRedis = {};
      responseRedis[accessToken] = refreshToken;

      RedisService.clearExpiredTokensByUid(key);
      RedisService.setHashMapValue(key, responseRedis);

      return res.send(responseUser);
    } else {
      return res.status(401).send({
        status: -1,
        message: "Auth failed: Login or Password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: -1,
      message: String(error),
    });
  }
};

/**
 * @params {body} {accessToken}
 * refreshes access token by refresh token in redis store
 */
exports.refreshToken = async (req, res) => {
  const accessToken = req.body.accessToken;
  //
  try {
    let decodedToken = decode(accessToken);
    let id = decodedToken.id;

    debug({ decodedToken });

    let refreshToken = await RedisService.getHM(id, accessToken);
    debug({ refreshToken });

    if (refreshToken) {
      let isExpired = await isTokenExpired(refreshToken);
      debug({ isExpired });

      if (!isExpired) {
        let payload = {
          username: decodedToken.username,
          id: decodedToken.id,
          role: decodedToken.role,
          life_time: decodedToken.life_time,
        };
        debug({ payload });

        let updatedAccessToken = refreshAccessToken(payload);

        let responseRedis = {};
        responseRedis[updatedAccessToken] = refreshToken;
        debug({ responseRedis });

        RedisService.clearExpiredTokensByUid(id);
        RedisService.setHashMapValue(id, responseRedis);

        res.status(200).send({
          status: 1,
          accessToken: updatedAccessToken,
        });
      } else {
        RedisService.clearExpiredTokensByUid(uid);
        return res.status(401).send("Expired token");
      }
    } else {
      return res.status(401).send("Invalid token");
    }
  } catch (error) {
    return res.status(401).send(String(error));
  }
};

exports.deleteToken = async (req, res) => {
  try {
    let uid = req.user.id;
    let accessToken = req.body.accessToken;

    debug({ uid, accessToken });

    let delToken = await RedisService.removeHM(uid, accessToken);
    debug({ delToken });

    if (delToken == 1) {
      return res.send({ status: 1, message: "Deleted" });
    } else {
      return res.send({ status: 1, message: "no val to delete" });
    }
  } catch (error) {
    return res.status(500).send({ status: -1, message: String(error) });
  }
};
