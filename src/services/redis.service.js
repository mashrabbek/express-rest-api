const redis = require("@/config/redis");
const { isTokenExpired } = require("@/utils/auth");

const connection = redis.getConnection();

function setHashMapValue(key, val) {
  connection.hmset(key, val);
}
module.exports.setHashMapValue = setHashMapValue;

function clearExpiredTokensByUid(uid) {
  connection.hgetall(uid, async function (err, values) {
    if (err) {
      throw err;
    }
    if (values) {
      for (const [key, value] of Object.entries(values)) {
        let isExpired = await isTokenExpired(value);
        if (isExpired) {
          connection.hdel(uid, key);
        }
      }
    }
  });
}
module.exports.clearExpiredTokensByUid = clearExpiredTokensByUid;

function isHMKeyExist(key, token) {
  return new Promise((resolve, reject) => {
    connection.hget(key, token, (error, reply) => {
      if (error) reject(error);
      else resolve(reply !== null ? true : false);
    });
  });
}
module.exports.isHMKeyExist = isHMKeyExist;

function getHM(key, subkey) {
  return new Promise((resolve, reject) => {
    connection.hget(key, subkey, (error, reply) => {
      if (error) reject(error);
      else resolve(reply);
    });
  });
}
module.exports.getHM = getHM;

function removeHM(key, subkey) {
  return new Promise((resolve, reject) => {
    connection.hdel(key, subkey, (error, reply) => {
      if (error) reject(error);
      else resolve(reply);
    });
  });
}
module.exports.removeHM = removeHM;
