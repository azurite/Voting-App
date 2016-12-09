const generator = require("./error-generator");
const generate = generator.exec;

module.exports = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  else {
    res.json(generate("UNAUTHORIZED"));
  }
};
