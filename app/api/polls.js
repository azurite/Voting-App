const url = require("url");
const qs = require("querystring");
const Poll = require("../../models/poll");
const generator = require("../utils/error-generator");
const generate = generator.exec;

module.exports = function(app) {
  app.get("/api/search", (req, res) => {
    const search = qs.parse(url.parse(req.url).query).q;

    Poll.searchByQuery(search, (err, polls) => {
      if(err) {
        res.json(generate("SEARCH_ERROR", err));
        return;
      }
      res.json(polls);
    });
  });
};
