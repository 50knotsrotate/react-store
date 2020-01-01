// const bcrypt = require('bcrypt');
module.exports = {
  signup: function(req, res, next) {
    const { username, password } = req.body;

    // hash the userpassword
    const saltrounds = 10;

    // bcrypt.hash(password, saltrounds, function(err, hash) {
    //   if (err) {
    //     //Pass the error to the error handler
    //     return next(err);
    //   } else {
    //     // Save into db.
    //     // Set user session
    //     // Send response back
    //   }
    // });
  },
  signin: function(req, res, next) {},
  logout: function(req, res, next) {}
};
