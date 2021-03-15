const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("@/config/connection");
const Menu = require("./Menu");
const Role = require("./Role");

class RoleMenu extends Model {}

RoleMenu.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      field: "role_id",
      references: {
        model: Role,
        key: "id",
      },
      validate: {
        isInt: {
          msg: "only numeric values allowed",
        },
      },
    },
    menuId: {
      type: DataTypes.INTEGER,
      field: "menu_id",
      references: {
        model: Menu,
        key: "id",
      },
      validate: {
        isInt: {
          msg: "only numeric values allowed",
        },
      },
    },
  },
  {
    sequelize: db,
    modelName: "RoleMenu",
  }
);

module.exports = RoleMenu;
