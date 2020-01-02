const client = require("mongodb").MongoClient;

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
          console.log('collection not created')
        } 
      });
    //   console.log("Database created");
    });
  },
  createUser: function(object, callback) {
    // First check if the username already exists
    dbo
      .collection("users")
      .find({ username: object.username })
      .toArray(function(err, res) {
        // If there is already an entry, return that error
        if (res.length > 0) return callback(null, "Username is taken");

        // else, insert into database
        dbo.collection("users").insertOne(object, function(err, res) {
          if (err) return callback(null, err);
          const { username, hash } = res.ops[0];
          const user = { username, hash };
          return callback(user, null);
        });
      });
  }
};
