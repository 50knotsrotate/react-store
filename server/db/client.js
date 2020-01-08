const client = require("mongodb").MongoClient;

const mailer = require("../controllers/nodeMailer");

let dbo;

module.exports = {
  connect: function(url) {
    client.connect(url, function(err, db) {
      if (err) {
        // TODO: Handle error
      }
      dbo = db.db("db");
      dbo.createCollection("users", function(err, res) {
        if (err) {
          console.log("collection not created");
        }
      });
    });
  },
  createUser: function(object) {
    return new Promise(function(resolve, reject) {
      dbo
        .collection("users")
        .find({ email: object.email })
        .toArray(function(err, res) {
          // If there is already an entry, return that error
          if (res.length > 0) {
            return reject({
              message: "Account with that email already exists",
              statusCode: 403
            });
          }

          // else, insert into database
          dbo.collection("users").insertOne(object, function(err, res) {
            if (err) return reject(err);
            const { email, hash } = res.ops[0];
            const user = { email, hash };
            return resolve(user);
          });
        });
    }); // First check if the username already exists
  },
  findUser: function(user) {
    return new Promise(function(resolve, reject) {
      dbo
        .collection("users")
        .find({ email: user.email })
        .toArray(function(err, res) {
          if (err) {
            // Something went wrong trying to find the user
            return reject({
              message: "Internal Server Error",
              statusCode: 500
            });
          }
          //If we get more than one user back, something went seriously wrong.
          if (res.length > 1) {
            return reject({
              message: "Internal Server Error",
              statusCode: 500
            });
          }
          //If nothing was returned, the user was not found in the DB
          if (!res.length) {
            return reject({
              message: "User not found",
              statusCode: 404
            });
          }
          // We got the user!
          return resolve({
            email: res[0].email,
            hash: res[0].hash
          });
        });
    });
  },
  // The following are for testing purposes only
  clear: function() {
    return new Promise(function(resolve, reject) {
      dbo
        .collection("users")
        .deleteOne({ username: "test123" }, function(err, _obj) {
          return err ? reject("DB NOT DROPPED") : resolve();
        });
    });
  }
};
