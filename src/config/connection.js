const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_HOST,
    port: 3306,
    dialect: "mysql",
  }
);

sequelize.sync({ force: true });

module.exports = sequelize;
