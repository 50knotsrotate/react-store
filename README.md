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
#### Now, I am going to have to setup a mongoDB instance to store user info.
