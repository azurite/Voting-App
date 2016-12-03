const types = require("./action-manifest");

const registerActions = {
  updateInput: function(field, input) {
    return {
      type: types.UPDATE_REGISTER_INPUT,
      field: field,
      input: input
    };
  },
  validateInput: function(field) {
    return {
      type: types.VALIDATE_REGISTER_INPUT,
      field: field
    };
  },
  register: function() {
    return {
      type: types.REGISTER,
    };
  },
  registerSuccess: function(user) {
    return {
      type: types.REGISTER_SUCCESS,
      user: user
    };
  },
  registerError: function(err) {
    return {
      type: types.REGISTER_ERROR,
      err: err
    };
  }
};
module.exports = registerActions;
