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

- _POST_ /signup
- _POST_ /login
- _POST_ /logout

```javascript
// All the route handler are located in ./controllers/auth.js
app.post("/signup", signup);

app.post("/signin", signin);

app.post("/logout", logout);
```

#### Right now, these route handlers dont do anything. Im going to start with signing up.

`npm install bcrypt`

```javascript
// This runs whenever a POST is made to /signup
// There will be futher validation on the front end before a POST is made here (no empty password etc...)
const bcrypt = require("bcrypt");
module.exports = {
  signup: function(req, res, next) {
    const { username, password } = req.body;
    // hash the userpassword
    const saltrounds = 10;

    bcrypt.hash(password, saltrounds, function(err, hash) {
      if (err) {
        //Pass the error to the error handler
        return next(err);
      } else {
        // Save into db.
        createUser({ username, hash }, function(user, error) {
          if (error) return next(error);

          // Set user session
          req.session.user = {};

          req.session.user.username = user.username;

          // Send response back
          res.status(200).send(req.session.user);
        });
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

#### Now I think its time to write some signup tests. I will be using mocha and chai.

`npm install mocha chai chai-http`

#### Now I will make a /db/tests.js file and start writing my tests there.

#### Here is what I came up with so far:

```javascript
const assert = require("chai").assert;
const app = require("../server/index");
var chai = require("chai"),
  chaiHttp = require("chai-http");
var expect = require("chai").expect;
const db = require("../server/db/client");
const auth = require("../server/controllers/auth");

chai.use(chaiHttp);

describe("Sign in", function() {
  beforeEach(function(done) {
    // Clear the users table
    db.clear(function(err) {
      if (err) {
        console.log("USERS TABLE NOT CLEARED");
        console.log(err);
      } else {
        done();
      }
    });
  });

  after(function(done) {
    // Clear the users table...again. Once before EACH test, and once after ALL tests.
    db.clear(function(err) {
      if (err) {
        console.log("USERS TABLE NOT CLEARED");
        console.log(err);
      } else {
        done();
      }
    });
  });

  it("Returns a new user when one signs up", function(done) {
    chai
      .request(app)
      .post("/signup")
      .send({ username: "test123", password: "password" })
      .then(res => {
        expect(res.body).to.not.eq(null);
        expect(res.body.password).to.not.eq("password");
        expect(Object.keys(res.body).length).to.eq(1);
        done();
      });
  });

  it("returns an error if a username is already taken", function(done) {
    chai
      .request(app)
      .post("/signup")
      .send({ username: "test123", password: "password" })
      .then(res => {
        chai
          .request(app)
          .post("/signup")
          .send({ username: "test123", password: "password" })
          .then(res => {
            expect(res.body.error).to.eq("Username is taken");
            done();
          });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
        done();
        // TODO: Error handling
      });
  });
});
```

#### Not done with these tests, but I'm happy with this for now. Next: Signing in, then I will create forms for these endpoints with redux-forms.

#### Signing in:

- _POST_ username & password to /signin
- Check if username exists in DB
  - If it does
    - Check hashed password against user submitted password
      - If they match
        - Update req.session
        - send back user object with a 200 status code
      - If they dont match
        - Send back wrong password error with a 401 status code
  - If it does not
    - send back username not found error with 404 status code

#### Here is what I came up with.

```javascript
signin: function(req, res, next) {
    const { username, password } = req.body;
      findUser({username}, function(user, err) {
      // If there was an error, forward to error handler
      if (err) return next(err);

      // Compare the passwords
      bcrypt.compare(password, user.hash, function(err, correct) {
        // If the password was correct
        if (correct) {
          // Set the user session
          req.session.user = {};
          req.session.user.username = user.username;

          // and send it to the client
          return res.status(200).send(req.session.user);

          // If they do not match
        } else {
          // Forward the error
          return next({
            message: "Incorrect password",
            statusCode: 404
          });
        }
      });
    });
  },
```

#### And in my client.js module, I wrote this function

```javascript
      findUser: function(userObj, callback) {
    dbo
      .collection("users")
      .find({ username: userObj.username })
      .toArray(function(err, res) {
        if (err) return callback(null, err);

        // If we got more than one object back, something went way wrong. Let the error handler know.
        if (res.length > 1)
          return callback(null, {
            message: "Internal Server Error",
            statusCode: 500
          });

          // If a user was not found, let the error handler know.
        if (!res.length) {
          return callback(null, {
            message: "User not found",
            statusCode: 404
          });
        }

        // Else, return the user
        return callback(
          {
            username: res[0].username,
            hash: res[0].hash
          },
          null
        );
      });
  }
```

#### Now, I just have to write some tests to make sure this behaves as expected.


```javascript
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
      .send({ username: "testusername", password: "wordpass" })
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(`ERROR: TEST USER NOT INSERTED`);
      });
  });

  after(function(done) {
    db.clear(function(err) {
      if (err) {
        console.log("USERS TABLE NOT CLEARED");
        console.log(err);
      } else {
          done();
      }
    });
  });

  it("returns a user when correct credentials are supplied", function(done) {
    chai
      .request(app)
      .post("/signin")
      .send({ username: "testusername", password: "wordpass" })
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(`ERROR: TEST USER NOT INSERTED`);
      });
  });

  it("returns an error when the username is found, but the password is incorrect", function(done) {
    chai
      .request(app)
      .post("/signin")
      .send({ username: "testusername", password: "wrong password" })
        .then(res => {
            expect(res.body.error.message).to.be.eq("Incorrect password");
            expect(res.body.error.statusCode).to.be.eq(404);
        done();
      })
        .catch(err => {
        //   console.log()
            console.log(`ERROR: TEST USER NOT INSERTED: ${err}`);
            // done()
      });
  });
});


```

#### I ran the tests, and they are all passing. Still more to write and this is not finished, but thats all for today. 
###### Note for tomorrow: The errors are being handled in different ways across the app. Sometimes only a string is being forwarded to the error handler(```next('some error message')```), while others get passed an object (```next(message: 'error message', statusCode: 400)```). I need to update each error so the error handler always gets the object. Also no ```expect``` is being called on the response when we signin with correct credentials. 
