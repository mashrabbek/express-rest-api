const { Model, Sequelize, DataTypes } = require("sequelize");
const db = require("@/config/connection");
const Role = require("./Role");
class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fio: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "User",

    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ unique: true, fields: ["username", "email"] }],
  }
);

Role.hasMany(User, { foreignKey: "role", sourceKey: "authority" });
User.belongsTo(Role, { foreignKey: "role", targetKey: "authority" });

//User.sync({ force: true });

module.exports = User;
