const Menu = require("@/db/models/Menu");
const { updateBody } = require("@/utils/request");
const Role = require("@/db/models/Role");
let debug = require("debug")("ins:controllers/menus");

/**
 *
 */
exports.getMenusList = async (req, res) => {
  debug({ user: req.user });

  try {
    let menus = await Menu.findAll({
      attributes: ["id", "parentId", "name", "url", "ord", "icon", "status"],
    });
    res.send(menus);
  } catch (error) {
    res.status(500).send(String(error));
  }
};

/**
 *
 */
exports.getUserMenusList = async (req, res) => {
  try {
    let roledata = await Role.findOne({
      where: { authority: req.user.role },
      include: {
        model: Menu,
        attributes: ["id", "parentId", "name", "url", "ord", "icon", "status"],
      },
    });
    return res.send(roledata["Menus"]);
  } catch (error) {
    return res.status(500).send(String(error));
  }
};

/**
 *
 */
exports.addMenu = async (req, res) => {
  //
  try {
    let menu = await Menu.create({
      parentId: req.body.parentId,
      name: req.body.name,
      url: req.body.url,
      ord: req.body.ord,
      status: req.body.status,
      createdBy: req.user.id,
    });
    res.status(200).send(menu);
  } catch (error) {
    res.status(500).send(String(error));
  }
};

/**
 *
 */
exports.editMenu = async (req, res) => {
  try {
    let updatingBody = await updateBody(req.body, "id");
    let resp = await Menu.update(updatingBody, { where: { id: req.body.id } });
    if (resp) res.send({ status: 1, message: "Successfull" });
    else res.send({ status: -1, message: "Not updated" });
  } catch (error) {
    res.status(500).send(String(error));
  }
};

/**
 *
 */
exports.deleteMenu = async (req, res) => {
  try {
    let resp = await Menu.destroy({
      where: {
        id: req.query.id,
      },
    });
    if (resp) res.send({ status: 1, message: "successfull" });
    else res.send({ status: -1, message: "Not deleted invalid id" });
  } catch (error) {
    res.send({ status: -1, message: error });
  }
};
