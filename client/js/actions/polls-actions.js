const types = require("./action-manifest");

const pollActions = {
  fetchPolls: function() {
    return {
      type: types.FETCH_POLLS
    };
  },
  fetchSuccess: function(polls) {
    return {
      type: types.FETCH_SUCCESS,
      polls: polls
    };
  },
  fetchError: function(error) {
    return {
      type: types.FETCH_ERROR,
      error: error
    };
  },
  updateSearch: function(search) {
    return {
      type: types.UPDATE_SEARCH,
      search: search
    };
  }
};

module.exports = pollActions;
