const pollsReducer = function(state, action) {
  switch(action.type) {
    case "FETCH-POLLS":
      return Object.assign({}, {
        searchBar: state.searchBar,
        polls: {
          polldata:[],
          isFetching: true,
          fetchSuccess: false,
          fetchError: false
        }
      });

    case "FETCH-SUCCESS":
      return Object.assign({}, {
        searchBar: state.searchBar,
        polls: {
          isFetching: false,
          fetchSuccess: true,
          fetchError: false,
          polldata: action.polls
        }
      });

    case "FETCH-ERROR":
      return Object.assign({}, {
        searchBar: state.searchBar,
        polls: {
          isFetching: false,
          fetchSuccess: false,
          fetchError: action.error,
          polldata: []
        }
      });

    case "UPDATE-SEARCH":
      return Object.assign({}, {
        searchBar: {
          search: action.search
        },
        polls: state.polls
      });

    default:
      return state;
  }
};

module.exports = pollsReducer;
