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
  }
};
module.exports = registerActions;
