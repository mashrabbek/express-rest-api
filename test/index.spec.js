const { chai, server, should, expect, assert } = require("./helper");

describe("Index Api", () => {
  before(function () {});

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
