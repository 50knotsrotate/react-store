const bcrypt = require('bcryptjs');
const { insert } = require('../db/client');
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
          const user = insert({ username, hash });
          
        // Set user session
          req.session.user.username = user;

        // Send response back
          res.status(200).send(req.session)
          
      }
    });
  },
  signin: function(req, res, next) {},
  logout: function(req, res, next) {}
};
