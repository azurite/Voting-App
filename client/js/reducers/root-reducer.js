const pollReducer = require("./polls-reducer");
const loginReducer = require("./login-reducer");
const registerReducer = require("./register-reducer");
const profileReducer = require("./profile-reducer");
const userReducer = require("./user-reducer");

const rootReducer = function(state, action) {
  return {
    polls: pollReducer(state.polls, action),
    login: loginReducer(state.login, action),
    register: registerReducer(state.register, action),
    profile: profileReducer(state.profile, action),
    user: userReducer(state.user, action)
  };
};

module.exports = rootReducer;
