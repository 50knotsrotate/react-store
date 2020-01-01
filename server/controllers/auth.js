const bcrypt = require("bcryptjs");
const { createUser, isUniqueUsername } = require("../db/client");
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
  signin: function(req, res, next) {},
  logout: function(req, res, next) {}
};
