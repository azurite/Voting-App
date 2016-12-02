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
  }
};

module.exports = profileActions;
