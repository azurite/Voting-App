const Account = require("../../models/account");
const generator = require("../utils/error-generator");
const types = generator.types;
const generate = generator.exec;

module.exports = function(app) {
  app.post("/api/login", (req, res) => {
    if(req.user) {
      res.json(generate(types.ALREADY_LOGGED_IN));
    }
  });
};
