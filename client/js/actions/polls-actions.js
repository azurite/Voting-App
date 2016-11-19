const pollActions = {
  fetchPolls: function() {
    return {
      type: "FETCH-POLLS"
    };
  },
  fetchSuccess: function(polls) {
    return {
      type: "FETCH-SUCCESS",
      polls: polls
    };
  },
  fetchError: function(error) {
    return {
      type: "FETCH-ERROR",
      error: error
    };
  },
  updateSearch: function(search) {
    return {
      type: "UPDATE-SEARCH",
      search: search
    };
  }
};

module.exports = pollActions;
