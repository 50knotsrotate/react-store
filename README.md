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

#### Now I am at the point where I have authentication and a simple store with a few items. The way I decided to do this is may not be the "best" way, but this is more of an excersise than an app I am actaully expecting people to use. What I have decided on doing is

#### - Create a json object which contains data about each object in the store (including a path to the image associated with that image)

```json
[
  {
    "id": 1,
    "title": "Sunglasses",
    "price": 49.99,
    "description": "Cool sunglasses to make your friends (and haters) jelous.",
    "image_file_path": "/assets/shopItems/sunglasses.jpg"
  },
  {
    "id": 2,
    "title": "Rock",
    "price": "199.99",
    "description": "Just a regular old rock to play with! Perfect for birthdays",
    "image_file_path": "/assets/shopItems/rock.jpg"
  },
  {
    "id": 3,
    "title": "Blanket",
    "price": "1999.99",
    "description": "Keep warm with this state of the art blanket",
    "image_file_path": "/assets/shopItems/blanket.jpg"
  }
]
```

#### - sending those images to the client from /public/assets/shopItems

```javascript
app.use(express.static("public"));
```

#### then looping over the items in the JSON object in the shopItems component (Which is placed inside the Home component)

```javascript
items.map((item, i) => {
    return (
      <Col>
        <div className="card">
          <img
            className="card-img-top"
            src={item.image_file_path}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="lead">${item.price}</p>
            <a href="#" className="btn btn-primary">
              Add To Cart
            </a>
          </div>
        </div>
      </Col>
```

#### Now I've got a store! Woo! Next thing on my mind:

- How am I going to manage the _state_ of the users cart? That is, how am I going to keep track of what the user has added to their cart? One option is to manage it through redux - super simple to get that set up, but has a drawback - the users cart will not be saved if the user exits the website. They will lose their cart. On the other hand, I could keep track of the user cart on the server, and save data between sessions, but this would mean having to make a request to the server each time a uer hits "add to cart". Since I don't have any callback functions that would be associated with a succesfull or unsuccesful request to the server (except maybe a little popup), this shouldnt be too difficult.. but there is one problem with this approach - I don't feel like doing that. Tinkering with a database halfway through writing an app usually leads to trouble. I have decided on the first option - redux. Lets go do that.

#### We already have our redux store setup, all I need to do here is add a ADD_TO_CART action which will take the name and price of the item as its payload. If the user already has said item in their cart, just add one to its quantity. If not, add it as a new item. I want the cart object to look something like this

```javascript
    cart: [
      {
        title: "blanket",
        price: 1999.99,
        quantity: 7
      },
      {
        title: "rock",
        price: 199.99,
        quantity: 2
      }
    ]
```

#### First I have to send that object to the redux store when it is clicked. This is done by importing the redux store, and adding an onClick listener to the "add to cart" button. 

```javascript
<a href="#" className="btn btn-primary" onClick={() => store.dispatch({ 
  type: "ADD_TO_CART", payload: {name: item.title, price: item.price}
  })}> 
```

#### and then handle that object in the redux store

```javascript
case "ADD_TO_CART":
      // Find out if the item exists
      let item = state.cart.filter(
        item => item.name === action.payload.name
      )[0];

      // If the result of the above filter returns undefined, it does not exist in the cart
      if (item) {
        item.quantity++;
        return state;
      } else {
        state.cart.push({
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1
        });
        return state;
      }

```

#### Okay I admit it may look like the worst pile of spaghetti code you have ever seen, but I will fix it later. Too much to do and too little time to do it. Its working, just trust me. 

#### I am going to take a step back here because I realized I forgot something important - my routes are not protected. As it stands now, a user can visit /cart without logging in. I don't want this. Now it would be easy for me to just connect to the redux store and redirect the user back to /signup if they are not authenticated, but what happens if I add more pages? More components that will need to access the redux state = more mess & more work. What I plam to do is create a <ProtectedRoute> HOC to replace the react-router-dom ```<Route />``` component. I want to accomplish 2 things with this HOC:
#### 1. The API should be the same as ```<Route/>```
#### 2. It should connect to the redux store and redirect if the user is not authenticated. 

#### This way I can handle all the redirecting in one place. 