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
  },
  requestLogin: function() {
    return {
      type: types.REQUEST_LOGIN
    };
  },
  loginSuccess: function(user) {
    return {
      type: types.LOGIN_SUCCESS,
      user: user
    };
  },
  loginFailure: function(err) {
    return {
      type: types.LOGIN_FAILURE,
      err: err
    };
  }
};

module.exports = loginActions;
