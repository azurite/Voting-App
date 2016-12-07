const login = require("./login");
const register = require("./register");

module.exports = function(app) {
  login(app);
  register(app);
};
