const passport = require("passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      username: req.user.username,
      email: req.user.email,
      ownPolls: req.user.ownPolls
    });
  });
};
