const types = require("./action-manifest.js");

const loginActions = {
  updateInput: function(input, field) {
    return {
      type: types.UPDATE_LOGIN_INPUT,
      input: input,
      field: field
    };
  },
  toggleEmailForm: function() {
    return {
      type: types.TOGGLE_EMAIL_FORM
    };
  }
};

module.exports = loginActions;
