const { chai, server, should, expect, assert } = require("./helper");

describe("Auth Endpoints", () => {
  describe("# POST /auth/login API test", () => {
    it("## should return access token", (done) => {
      //
      chai
        .request(server)
        .post("/auth/login")
        .send({ username: "admin", password: "secret" })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          expect(res.body).to.have.property("status").eq(1);
          expect(res.body).to.have.property("accessToken");
          done();
        });
    });
  });

  describe("# POST /auth/token API test", () => {
    let token;
    before((done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send({ username: "admin", password: "secret" })
        .end((err, res) => {
          if (err) done(err);
          token = res.body.accessToken;
          done();
        });
    });

    it("## should return access token", (done) => {
      chai
        .request(server)
        .post("/auth/token")
        .set("Authorization", "Bearer " + token)
        .send({ accessToken: token })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          expect(res.body).to.have.property("status").with.to.equal(1);
          expect(res.body).to.have.property("accessToken");
          done();
        });
    });
  });
});
