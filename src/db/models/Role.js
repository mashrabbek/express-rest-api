const { Sequelize, DataTypes } = require("sequelize");
const db = require("@/config/connection");
const Menu = require("./Menu");
const RoleMenu = require("./RoleMenu");

const Role = db.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authority: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "only letters allowed",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "only letters allowed",
        },
        len: {
          args: [1],
          msg: "size exceeded limit",
        },
      },
    },
    createdBy: {
      type: DataTypes.UUID,
      field: "created_by",
    },
  },
  { indexes: [{ unique: true, fields: ["authority"] }] }
);

Menu.belongsToMany(Role, { through: RoleMenu, foreignKey: "menuId" });
Role.belongsToMany(Menu, { through: RoleMenu, foreignKey: "roleId" });

//Role.sync({ force: true });

module.exports = Role;
