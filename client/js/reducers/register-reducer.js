const types = require("../actions/action-manifest");
const MAX_LENGTH = 8;

const validator = function(type, value, compare) {
  switch(type) {
    case "email":
      if(value === "") { return null; }
      return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

    case "password":
      if(value === "") { return null; }
      return value.length >= MAX_LENGTH;

    case "password_confirm":
      if(value === "") { return null; }
      return value === compare;
  }
};

const registerReducer = function(state, action) {
  var nextState;
  switch(action.type) {
    case types.UPDATE_REGISTER_INPUT:
      nextState = Object.assign({}, state);
      nextState[action.field].value = action.input;
      return nextState;

    case types.VALIDATE_REGISTER_INPUT:
      nextState = Object.assign({}, state);
      nextState[action.field].isValid = validator(
        action.field,
        state[action.field === "password_confirm" ? "password" : action.field].value,
        state.password_confirm.value
      );
      return nextState;

    case types.REGISTER:
      nextState = Object.assign({}, state);
      nextState.reqPending = true;
      return nextState;

    case types.REGISTER_SUCCESS:
      nextState = Object.assign({}, state);
      nextState.reqPending = false;
      nextState.err = null;
      return nextState;

    case types.REGISTER_ERROR:
      nextState = Object.assign({}, state);
      nextState.reqPending = false;
      nextState.err = action.err;
      return nextState;

    default:
      return state;
  }
};

module.exports = registerReducer;
