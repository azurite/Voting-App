const passport = require("passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      username: req.user.username,
      email: req.user.email,
      ownPolls: req.user.ownPolls.map((poll) => {
        return {
          id: poll._id.toString(16),
          author: req.user.username,
          createdAt: poll.createdAt,
          body: {
            title: poll.body.title,
            options: poll.body.options,
            totalVotes: poll.body.totalVotes
          }
        };
      })
    });
  });
};
