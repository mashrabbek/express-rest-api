const { Sequelize, DataTypes } = require("sequelize");
const db = require("@/config/connection");
// const Role = require("./Role");
// const RoleMenus = require("./RoleMenu");

const Menu = db.define(
  "Menu",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      field: "parent_id",
    },
    name: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ord: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: "label",
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      field: "created_by",
      defaultValue: 1,
    },
  },
  { indexes: [{ unique: true, fields: ["url"] }] }
);

//Menu.sync({ force: true });

module.exports = Menu;
