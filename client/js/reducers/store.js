const { createStore } = require("redux");
const pollReducer = require("./polls-reducer");
const loginReducer = require("./login-reducer");

const initialState = {
  polls: {
    searchBar: {
      search: ""
    },
    polls: {
      polldata: [],
      isFetching: false,
      fetchSuccess: null,
      fetchError: null
    }
  },
  login: {
    login: {
      emailOpen: false
    },
    emailForm: {
      email: "",
      password: ""
    }
  }
};

const rootReducer = function(state, action) {
  return {
    polls: pollReducer(state.polls, action),
    login: loginReducer(state.login, action)
  };
};

module.exports = createStore(rootReducer, initialState);
