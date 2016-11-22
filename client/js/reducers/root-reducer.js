const pollReducer = require("./polls-reducer");
const loginReducer = require("./login-reducer");
const registerReducer = require("./register-reducer");

const rootReducer = function(state, action) {
  return {
    polls: pollReducer(state.polls, action),
    login: loginReducer(state.login, action),
    register: registerReducer(state.register, action)
  };
};

module.exports = rootReducer;
