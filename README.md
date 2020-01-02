# React store

#### This is going to be my attempt at a full stack online store, complete with user authentication, user sessions, shopping cart, payment, and email confimations. I will be using:

- React
  - Redux
  - Redux form
  - React router
  - React bootstrap
- Node

  - Express

- Mongodb

First thing I am going to do is setup my endpoints for user authentication

- _POST_ /auth/signup
- _POST_ /auth/login
- _POST_ /auth/logout

```javascript
// All the callbacks are located in ./controllers/auth.js
app.post("/signup", signup);

app.post("/signin", signin);

app.post("/logout", logout);
```

#### Right now, these callbacks dont do anything. Im going to start with signing in.

`npm install bcrypt`

```javascript
const bcrypt = require("bcrypt");
module.exports = {
  signin: function(req, res, next) {
    // Get the username and password from the body of the request.
    const { username, password } = req.body;

    // hash the userpassword
    const saltrounds = 10;

    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        //Pass the error to the error handler
        return next(err);
      } else {
        // Save into db.
        // Set user session
        // Send response back
      }
    });
  }
};
```

#### Now, I am going to have to setup a mongoDB instance to store user info. Here is my mongo module so far

```javascript
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
          //  TODO: Handle error
        } else {
          console.log("Collection created!");
        }
      });
      console.log("Database created");
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
```

##### Question: Is there a way for me to create a new user without making 2 DB calls? I have one for checking if the username is taken, and one for inserting.

#### and in my index.js file, bring in the connect function

```javascript
const db = require("./db/client");

db.connect();
```

#### and when a _POST_ is made to /signup:

```javascript
signup: function(req, res, next) {
    const { username, password } = req.body;
        if (isUniqueUsername(username, next)) {
            // hash the userpassword
            const saltrounds = 10;

            bcrypt.hash(password, saltrounds, function (err, hash) {
                if (err) {
                    //Pass the error to the error handler
                    return next(err);
                } else {
                    // Save into db.
                    createUser({ username, hash }, function (user, error) {
                        if (err) return next(error);

                        // Set user session
                        req.session.user = {};

                        req.session.user.username = user.username;

                        // Send response back
                        res.status(200).send(req.session.user);
                    });
                }
            });
```

#### But I cant do anything with sessions: I havent installed it yet. `npm install express-session`

#### and adding this to my index.js file:

```javascript
const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);
```

#### Later on I will be installing and using Redis as my session store, but for now this will do.

#### Now I think its time to write some signup tests. I will be using mocha, just because Im more used to it... Plus I like the way it makes it easy to run asyncronous tests. 

``` npm install mocha ``` 

#### Now I will make a /db/tests.js file and start writing my tests there. 

#### Here is what I came up with: 
