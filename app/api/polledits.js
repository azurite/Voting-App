const Poll = require("../../models/poll");
const Account = require("../../models/account");
const ensureAuthenticated = require("../utils/ensure-auth");
const generator = require("../utils/error-generator");
const generate = generator.exec;

module.exports = function(app) {

  app.post("/api/polleditor", ensureAuthenticated, (req, res) => {
    Poll.createNewPoll(req.body.polldata, req.user.username, (err, status) => {
      if(err) {
        return res.json(generate("CREATE_POLL_ERROR", err));
      }
      if(status === "success") {
        Account.getUpdatedUser(req.user.username, (err, updatedUser) => {
          if(err) {
            return res.json(generate("UPDATE_POLL_INFO_ERROR", err));
          }
          res.json(updatedUser);
        });
      }
    });
  });

  app.put("/api/polleditor", ensureAuthenticated, (req, res) => {
    //Poll.editPoll();
    //Account.getUpdatedUser();
  });

  app.delete("/api/polleditor", ensureAuthenticated, (req, res) => {
    //Poll.deletePoll();
    //Account.getUpdatedUser();
  });
};
