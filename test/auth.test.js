require("module-alias/register");
require("@/config/index");

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("@/app");
const should = chai.should();
const expect = chai.expect;

describe("Index Api", () => {
  before(function () {
    console.log("before. index api");
  });

  after(function () {
    console.log("after. index api");
  });

  it("should return index", (done) => {
    chai
      .request(server)
      .get("/index")
      .end((err, resp) => {
        if (err) console.log(err);
        resp.should.have.status(200);
        expect(resp.text).equals("index");
        done();
      });
  });
});
