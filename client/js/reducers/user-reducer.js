const types = require("../actions/action-manifest");

const userReducer = function(state, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;

    case types.REGISTER_SUCCESS:
      return action.user;

    case types.LOGOUT:
      return null;

    default:
      return state;
  }
};

module.exports = userReducer;
