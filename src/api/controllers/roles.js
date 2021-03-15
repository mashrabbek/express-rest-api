const Role = require("@/db/models/Role");
const RoleMenu = require("@/db/models/RoleMenu");
const RequestUtils = require("@/utils/request");
const sequelize = require("@/config/connection");

let debug = require("debug")("ins:controllers/roles");

/**
 *  get all role list
 */
exports.getRolesList = async (req, res) => {
  try {
    let roles = await Role.findAll({
      attributes: ["id", "authority", "name", "status"],
    });
    res.send(roles);
  } catch (error) {
    res.status(500).send(String(error));
  }
};

/**
 * @param {body} { menus, authority, name, status}
 * creating new role
 */
exports.addRole = async (req, res) => {
  try {
    const transaction = await sequelize.transaction();

    let menus = req.body.menus;
    let role = await Role.create(
      {
        authority: req.body.authority,
        name: req.body.name,
        status: req.body.status,
        createdBy: req.user.id,
      },
      { transaction }
    );

    for (let i = 0; i < menus.length; i++) {
      await RoleMenu.create(
        {
          roleId: role.id,
          menuId: menus[i],
        },
        { transaction }
      );
    }
    await transaction.commit();
    res.status(200).send(role);
  } catch (error) {
    await t.rollback();
    res.status(500).send(String(error));
  }
};

/**
 * @param {*} body
 * editing existing role by roleId
 */
exports.editRole = async (req, res) => {
  try {
    let updatingBody = await RequestUtils.updateBody(req.body, "id");
    const transaction = await sequelize.transaction();

    let resp = await Role.update(
      updatingBody,
      { where: { id: req.body.id } },
      { transaction }
    );

    let menus = req.body.menus;

    if (menus) {
      await RoleMenu.destroy(
        { where: { roleId: req.body.id } },
        { transaction }
      );

      for (let i = 0; i < menus.length; i++) {
        await RoleMenu.create(
          {
            roleId: req.body.id,
            menuId: menus[i],
          },
          { transaction }
        );
      }
    }
    await transaction.commit();

    if (resp) res.send({ status: 1, message: "Successfull" });
    else res.send({ status: -1, message: "Not updated" });
  } catch (error) {
    await t.rollback();
    res.status(500).send(String(error));
  }
};

/**
 * @param {query} id
 *  delete role by id
 */
exports.deleteRole = async (req, res) => {
  try {
    let resp = await Role.destroy({
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
