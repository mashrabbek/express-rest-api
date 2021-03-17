require("module-alias/register");
require("@/config/index");

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("@/app");
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

module.exports = {
  chai,
  server,
  should,
  expect,
  assert,
};
