const loginActions = {
  updateInput: function(input, field) {
    return {
      type: "UPDATE-LOGIN-INPUT",
      input: input,
      field: field
    };
  },
  toggleEmailForm: function() {
    return {
      type: "TOGGLE-EMAIL-FORM"
    };
  }
};

module.exports = loginActions;
