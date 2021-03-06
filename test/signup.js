const assert = require("chai").assert;
const app = require("../server/index");
var chai = require("chai"),
  chaiHttp = require("chai-http");
var expect = require("chai").expect;
const db = require("../server/db/client");
const auth = require("../server/controllers/auth");

chai.use(chaiHttp);

describe("Sign up", function(done) {
  beforeEach(function(done) {
    // Clear the users table
    db.clear()
      .then(res => done())
      .catch(err => console.log(err));
  });

  after(function(done) {
    db.clear()
      .then(res => done())
      .catch(err => console.log(err));
  });

  it("Returns a new user when one signs up", function(done) {
    chai
      .request(app)
      .post("/signup")
      .send({ email: "test123@test.com", password: "password" })
      .then(res => {
        expect(res.body).to.not.eq(null);
        expect(res.body.password).to.not.eq("password");
        expect(Object.keys(res.body).length).to.eq(2);
        done();
      });
  });

  it("returns an error if a email is already taken", function(done) {
    chai
      .request(app)
      .post("/signup")
      .send({ email: "test123@email.com", password: "password" })
      .then(res => {
        chai
          .request(app)
          .post("/signup")
          .send({ email: "test123@test.com", password: "password" })
          .then(res => {
            expect(res.body.error.message).to.eq(
              "Account with that email already exists"
            );
            done();
          });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
        done();
      });
  });
});
