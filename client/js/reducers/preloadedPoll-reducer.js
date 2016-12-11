const types = require("../actions/action-manifest");

module.exports = function(state, action) {
  switch(action.type) {
    case types.UPDATE_PRELOADED_POLL:
      switch(action.verb) {
        case "remove":
          if(state && state.id === action.poll.id) {
            return null;
          }
          return state;

        case "update":
          if(state && state.id === action.poll.id) {
            return action.poll;
          }
          return state;
      }
      break;

    case types.PRELOAD_POLL:
      return action.poll;

    default:
      return state;
  }
};
