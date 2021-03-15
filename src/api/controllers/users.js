const RequestUtils = require("@/utils/request");
const User = require("@/db/models/User");
const { hash } = require("@/utils/auth");

let debug = require("debug")("ins:controllers/users");

/**
 * @param {*} req
 */
exports.getUsersList = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: [["id", "uid"], "username", "email", "role", "status"],
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(String(error));
  }
};

/**
 * @param {body} { username, password, bankCode, role, status}
 * adding  new user
 */
exports.addUser = async (req, res) => {
  try {
    let newUser = await User.create({
      username: req.body.username,
      password: await hash(req.body["password"]),
      bankCode: req.body.bankCode,
      role: req.body.role,
      status: req.body.status,
      createdBy: req.user.id,
    });

    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(String(error));
  }
};

/**
 * editing details existing user by user id
 *
 */
exports.editUser = async (req, res) => {
  try {
    let updatingBody = await RequestUtils.updateBody(req.body, "id");
    let resp = await User.update(updatingBody, { where: { id: req.body.id } });
    if (resp) res.send({ status: 1, message: "Successfull" });
    else res.send({ status: -1, message: "Not updated" });
  } catch (error) {
    res.status(500).send(String(error));
  }
};

/**
 * @param {query} {id}
 * delete user by userid
 */
exports.deleteUser = async (req, res) => {
  try {
    let resp = await User.destroy({
      where: {
        id: req.query.id,
      },
    });
    if (resp) res.send({ status: 1, message: "successfull" });
    else res.send({ status: -1, message: "Not deleted Invalid id" });
  } catch (error) {
    res.send({ status: -1, message: error });
  }
};
