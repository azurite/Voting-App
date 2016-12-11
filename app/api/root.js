const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const polls = require("./polls");
const polledits = require("./polledits");
const voting = require("./voting");

module.exports = function(app) {
  login(app);
  logout(app);
  register(app);
  polls(app);
  polledits(app);
  voting(app);
};
