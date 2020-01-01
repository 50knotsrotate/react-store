const client = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

module.exports = client.connect(url, function(err, db) {
  if (err) {
    // TODO: Handle error
  }
  var dbo = db.db("db");
  dbo.createCollection("users", function(err, res) {
    if (err) {
      //  TODO: Handle error
    } else {
      console.log("Collection created!");
    }
  });
  console.log("Database created");
});
