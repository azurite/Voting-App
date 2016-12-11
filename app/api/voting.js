const Poll = require("../../models/poll");
const generator = require("../utils/error-generator");
const generate = generator.exec;

module.exports = function(app) {
  app.post("/api/vote", (req, res) => {
    Poll.vote(req.body.id, req.body.option, (err, status) => {
      if(err) {
        res.json(generate("VOTE_ERROR", err));
        return;
      }
      res.json(status);
    });
  });
};
