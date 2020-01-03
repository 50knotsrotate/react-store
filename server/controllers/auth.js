const bcrypt = require("bcryptjs");
const { createUser, findUser } = require("../db/client");
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
  },
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
  logout: function(req, res, next) {}
};
