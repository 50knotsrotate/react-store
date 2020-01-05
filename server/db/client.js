const client = require("mongodb").MongoClient;

const mailer = require('../controllers/nodeMailer');

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
  createUser: function(object, callback) {
    // First check if the username already exists
    dbo
      .collection("users")
      .find({ email: object.email })
      .toArray(function(err, res) {
        // If there is already an entry, return that error
        if (res.length > 0) return callback(null, "Username is taken");

        // else, insert into database
        dbo.collection("users").insertOne(object, function(err, res) {
          if (err) return callback(null, err);
          // console.log(res)
          const { email, hash } = res.ops[0];
          const user = { email, hash };
          mailer.sendEmail('pjmcmahon2@gmail.com', function (success, error) {
            return callback(user, null);
           })
        });
      });
  },
  findUser: function(userObj, callback) {
    dbo
      .collection("users")
      .find({ username: userObj.username })
      .toArray(function(err, res) {
        if (err) return callback(null, err);
        if (res.length > 1)
          return callback(null, {
            message: "Internal Server Error",
            statusCode: 500
          });
        if (!res.length) {
          return callback(null, {
            message: "User not found",
            statusCode: 404
          });
        }
        return callback(
          {
            username: res[0].username,
            hash: res[0].hash
          },
          null
        );
      });
  },
  // The following are for testing purposes only
  clear: function(callback) {
    dbo
      .collection("users")
      .deleteOne({ username: "test123" }, function(err, _obj) {
        if (err) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
  }
};
