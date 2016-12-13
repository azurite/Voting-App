const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const polls = require("./polls");
const polledits = require("./polledits");
const voting = require("./voting");
const deleteAccount = require("./deleteAccount");

module.exports = function(app) {
  login(app);
  logout(app);
  register(app);
  polls(app);
  polledits(app);
  voting(app);
  deleteAccount(app);
};
