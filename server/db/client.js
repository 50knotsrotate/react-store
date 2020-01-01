const client = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

let dbo;

module.exports = {
  connect: function() {
    client.connect(url, function(err, db) {
      if (err) {
        // TODO: Handle error
      }
      dbo = db.db("db");
      dbo.createCollection("users", function(err, res) {
        if (err) {
          //  TODO: Handle error
        } else {
          console.log("Collection created!");
        }
      });
      console.log("Database created");
    });
  },
  insert: function(object) {
    dbo.collection("users").insertOne(object, function(err, res) {
      if (err) return console.log(err); //TODO error handle
      const { username, hash } = res.ops[0];
      const user = { username, hash };
      return user;
    });
  }
};
