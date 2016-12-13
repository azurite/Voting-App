const url = require("url");
const qs = require("querystring");
const ensureAuthenticated = require("../utils/ensure-auth");
const Account = require("../../models/account");
const generator = require("../utils/error-generator");
const generate = generator.exec;

module.exports = function(app) {
  app.delete("/api/deleteAccount", ensureAuthenticated, (req, res) => {
    const id = qs.parse(url.parse(req.url).query).id;
    
    Account.deleteUserAndPolls(id, (err) => {
      if(err) {
        return res.json(generate("ACCOUNT_DELETE_ERROR", err));
      }
      req.session.destroy();
      res.json({ success: 1 });
    });
  });
};
