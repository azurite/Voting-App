const types = require("./action-manifest");

const profileActions = {
  createPoll: function() {
    return {
      type: types.CREATE_POLL
    };
  },
  editPoll: function(poll) {
    return {
      type: types.EDIT_POLL,
      poll: poll
    };
  },
  updatePollInput: function(field, value) {
    return {
      type: types.UPDATE_POLL_INPUT,
      field: field,
      value: value
    };
  },
  addOption: function(option) {
    return {
      type: types.ADD_OPTION,
      option: option
    };
  },
  removeOption: function(option) {
    return {
      type: types.REMOVE_OPTION,
      option: option
    };
  },
  saveEdit: function() {
    return {
      type: types.SAVE_EDIT
    };
  },
  cancelEdit: function() {
    return {
      type: types.CANCEL_EDIT
    };
  },
  saveSuccess: function() {
    return {
      type: types.SAVE_SUCCESS
    };
  },
  saveError: function(err) {
    return {
      type: types.SAVE_ERROR,
      err: err
    };
  },
  deletePoll: function(id) {
    return {
      type: types.DELETE_POLL,
      id: id
    };
  },
  deleteSuccess: function() {
    return {
      type: types.DELETE_SUCCESS
    };
  },
  deleteError: function(err, id) {
    return {
      type: types.DELETE_ERROR,
      err: err,
      id: id
    };
  },
  updateUserData: function(user) {
    return {
      type: types.UPDATE_USER_DATA,
      user: user
    };
  },
  updateSearchCache: function(poll, verb) {
    return {
      type: types.UPDATE_SEARCH_CACHE,
      poll: poll,
      verb: verb
    };
  },
  updatePreloadedPoll: function(poll, verb) {
    return {
      type: types.UPDATE_PRELOADED_POLL,
      poll: poll,
      verb: verb
    };
  },
  preloadPoll: function(poll) {
    return {
      type: types.PRELOAD_POLL,
      poll: poll
    };
  }
};

module.exports = profileActions;
