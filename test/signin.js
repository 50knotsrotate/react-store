const assert = require("chai").assert;
const app = require("../server/index");
var chai = require("chai"),
  chaiHttp = require("chai-http");
var expect = require("chai").expect;
const db = require("../server/db/client");
const auth = require("../server/controllers/auth");

chai.use(chaiHttp);

describe("Sign In", function(done) {
  before(function(done) {
    chai
      .request(app)
      .post("/signup")
      .send({ email: "testusername@fake.com", password: "wordpass" })
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(`ERROR: TEST USER NOT INSERTED`);
      });
  });

  after(function(done) {
    db.clear()
      .then(res => done())
      .catch(err => console.log(err));
  });

  it("returns a user when correct credentials are supplied", function(done) {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "testusername@fake.com", password: "wordpass" })
      .then(res => {
        //console.log(res)
        expect(res.body.email).to.eq("testusername@fake.com");
        done();
      })
      .catch(err => {
        // console.log(`ERROR: TEST USER NOT INSERTED`);
      });
  });

  it("returns an error when the username is found, but the password is incorrect", function(done) {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "testusername@fake.com", password: "wrong password" })
      .then(res => {
        expect(res.body.error.message).to.be.eq("Incorrect password");
        expect(res.body.error.statusCode).to.be.eq(404);
        done();
      })
      .catch(err => {
        //   console.log()
        // console.log(`ERROR: TEST USER NOT INSERTED: ${err}`);
        // done()
      });
  });
});
