/**
 *  cli to seed
 */
require("module-alias/register");
const sequelize = require("@/config/connection");

const { Command } = require("commander");
const program = new Command();

const Menu = require("@/db/models/Menu");
const Role = require("@/db/models/Role");
const User = require("@/db/models/User");
const RoleMenu = require("@/db/models/RoleMenu");

const { hash } = require("@/utils/auth");

program
  .version("0.1.0")
  .command("seed")
  .action(async function () {
    console.log("cli executed...");
    const t = await sequelize.transaction();

    try {
      let menu = await Menu.create(
        {
          parentId: null,
          name: "Admin",
          url: "/admin",
          ord: 1,
          status: "A",
        },
        { transaction: t }
      );

      let role = await Role.create(
        {
          authority: "admin",
          name: "Administrator",
          status: "A",
        },
        { transaction: t }
      );

      await RoleMenu.create(
        {
          roleId: role.id,
          menuId: menu.id,
        },
        { transaction: t }
      );

      let user = await User.create(
        {
          username: "admin",
          password: await hash("secret"),
          fio: "root user",
          email: "admin@mail.com",
          role: role.authority,
          status: "A",
        },
        { transaction: t }
      );
      await t.commit();

      console.log({ user: user.dataValues });
    } catch (error) {
      await t.rollback();
      console.log(error);
    }
  });

program.parse(process.argv);
