const bcrypt = require("bcryptjs");
const { createUser, findUser } = require("../db/client");
const mailer = require("../controllers/nodeMailer");
const { welcome } = require('../controllers/mailerconstants');
module.exports = {
  signup: function(req, res, next) {
    const { email, password } = req.body;
    // hash the userpassword
    const saltrounds = 10;

    bcrypt.hash(password, saltrounds, function(err, hash) {
      if (err) {
        //Pass the error to the error handler
        return next({
          message: err,
          statusCode: 500
        });
      } else {
        // Save into db.
        createUser({ email, hash }, function(user, error) {
          if (error) {
            return next({
              message: error,
              statusCode: 500
            });
          }
          // Set user session
          req.session.user = {};

          req.session.user.email = user.email;

          req.session.user.cart = [];

          mailer.sendEmail(email, 'Welcome!', welcome);

          res.status(200).send(req.session.user);

          //TODO: handle error
        });
      }
    });
  },
  signin: function(req, res, next) {
    const { email, password } = req.body;
    findUser({ email }, function(user, err) {
      // If there was an error, forward to error handler
      if (err) {
        return next({
          message: err,
          statusCode: 500
        });
      }

      // Compare the passwords
      bcrypt.compare(password, user.hash, function(err, correct) {
        // If the password was correct
        if (correct) {
          // Set the user session
          req.session.user = {};
          
          req.session.user.email = user.email;

          req.session.user.cart = [];

          req.session.save();

          // and send it to the client
          return res.json(req.session.user);

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
