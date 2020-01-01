module.exports = {
    signup: function (req, res, next) {
        const { username, password } = req.body;
        console.log(username, password)
  },
  signin: function(req, res, next) {},
  logout: function(req, res, next) {}
};
