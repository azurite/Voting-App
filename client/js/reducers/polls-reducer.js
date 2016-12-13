const types = require("../actions/action-manifest");

function match(curr, next) {
  return (new RegExp(curr, "i")).test(next);
}

const pollsReducer = function(state, action) {
  var nextState, nextCache;
  switch(action.type) {
    case types.FETCH_POLLS:
      return Object.assign({}, {
        searchBar: state.searchBar,
        didVote: state.didVote,
        polls: {
          polldata:[],
          isFetching: true,
          fetchSuccess: false,
          fetchError: false
        }
      });

    case types.FETCH_SUCCESS:
      return Object.assign({}, {
        searchBar: state.searchBar,
        didVote: state.didVote,
        polls: {
          isFetching: false,
          fetchSuccess: true,
          fetchError: false,
          polldata: action.polls
        }
      });

    case types.FETCH_ERROR:
      return Object.assign({}, {
        searchBar: state.searchBar,
        didVote: state.didVote,
        polls: {
          isFetching: false,
          fetchSuccess: false,
          fetchError: action.error,
          polldata: []
        }
      });

    case types.UPDATE_SEARCH:
      return Object.assign({}, {
        searchBar: {
          search: action.search
        },
        didVote:state.didVote,
        polls: state.polls
      });

    case types.UPDATE_SEARCH_CACHE:
      nextState = Object.assign({}, state);
      switch(action.verb) {
        case "add":
          if(match(state.searchBar.search, action.poll.body.title)) {
            nextCache = state.polls.concat([action.poll]);
          }
          break;

        case "update":
          nextCache = state.polls.polldata.map((p) => {
            if(p.id === action.poll.id) {
              return action.poll;
            }
            return p;
          });
          break;

        case "remove":
          nextCache = state.polls.polldata.filter((p) => {
            return p.id !== action.poll.id;
          });
          break;
      }
      nextState.polls.polldata = nextCache || nextState.polls.polldata;
      return nextState;

    case types.VOTE:
      nextState = Object.assign({}, state);
      nextState.polls.polldata = nextState.polls.polldata.map((poll) => {
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
      });
      return nextState;

    case types.TOGGLE_DID_VOTE_MSG:
      return Object.assign({}, state, {
        didVote: state.didVote ? null : action.message
      });

    case types.PURGE_MEMORY:
      return Object.assign({}, state, {
        polls: {
          polldata: [],
          isFetching: false,
          fetchSuccess: null,
          fetchError: null
        }
      });

    default:
      return state;
  }
};

module.exports = pollsReducer;
