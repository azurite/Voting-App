const types = require("../actions/action-manifest");

const userReducer = function(state, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;

    case types.REGISTER_SUCCESS:
      return action.user;

    case types.LOGOUT:
      return null;

    case types.DELETE_ACCOUNT:
      return null;

    case types.UPDATE_USER_DATA:
      return action.user;

    case types.VOTE:
      if(state) {
        return Object.assign({}, state, {
          ownPolls: state.ownPolls.map((poll) => {
            if(poll.id === action.vote.id) {
              ++poll.body.totalVotes;
              poll.body.options = poll.body.options.map((opt) => {
                if(opt.option === action.vote.option) {
                  ++opt.votes;
                }
                return opt;
              });
              return poll;
            }
            return poll;
          })
        });
      }
      return state;

    default:
      return state;
  }
};

module.exports = userReducer;
