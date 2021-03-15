const jwt = require("jsonwebtoken");
const { decode } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let debug = require("debug")("ins:utils/auth");

/**
 * !!! Don't Change
 * @param {token}
 *  checks if token expired by exp obj comparing current timestamp
 */
function isTokenExpired(token) {
  return new Promise((resolve, reject) => {
    let data = decode(token);
    if (data) {
      resolve(Math.floor(Date.now() / 1000) > data.exp ? true : false);
    }
  });
}
module.exports.isTokenExpired = isTokenExpired;

/**
 * @param {string} password
 *  hashes password
 */
async function hash(password) {
  try {
    return bcrypt.hashSync(password, parseInt(process.env.HASH_SALT));
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.hash = hash;

/**
 *
 * @param {*} payload
 * @param {*} refreshToken
 * generates access token by given payload and expire time of refreshtoken
 * */
function generateAccessToken(payload, refreshToken) {
  try {
    const accessToken = jwt.sign(
      {
        ...payload,
        life_time: decode(refreshToken).exp,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: eval(process.env.ATE_TIME),
      }
    );
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.generateAccessToken = generateAccessToken;

/**
 * @param {*} payload
 * generates refresh token by provided payload
 */
function generateRefreshToken(payload) {
  try {
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: eval(process.env.RTE_TIME),
    });
    return refreshToken;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.generateRefreshToken = generateRefreshToken;

/**
 * @param {*} payload
 *
 */

function refreshAccessToken(payload) {
  try {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: eval(process.env.ATE_TIME),
    });
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports.refreshAccessToken = refreshAccessToken;
