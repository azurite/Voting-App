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

    case types.VOTE:
      if(state && state.id === action.vote.id) {
        return Object.assign({}, state, {
          body: {
            title: state.body.title,
            totalVotes: state.body.totalVotes + 1,
            options: state.body.options.map((opt) => {
              if(opt.option === action.vote.option) {
                ++opt.votes;
              }
              return opt;
            })
          }
        });
      }
      return state;

    case types.PURGE_MEMORY:
      return null;

    default:
      return state;
  }
};
