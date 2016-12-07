const passport = require("passport");
const Account = require("../../models/account");
const generator = require("../utils/error-generator");
const generate = generator.exec;

module.exports = function(app) {
  app.post("/api/register", (req, res) => {
    if(req.user) {
      res.json(generate("ALREADY_REGISTERED"));
    }
    else {
      var userinfo = {
        username: req.body.username,
        email: req.body.email
      };

      Account.register(new Account(userinfo), req.body.password, (err) => {
        if(err) {
          res.json(generate("REGISTER_ERROR", err));
        }
        else {
          passport.authenticate("local")(req, res, () => {
            res.json({
              username: req.user.username,
              email: req.user.email,
              ownPolls: req.user.ownPolls
            });
          });
        }
      });
    }
  });
};
