const loginReducer = function(state, action) {
  switch(action.type) {
    case "UPDATE-LOGIN-INPUT":
      return Object.assign({}, {
        login: state.login,
        emailForm: {
          email: action.field === "email" ? action.input : state.emailForm.email,
          password: action.field === "password" ? action.input : state.emailForm.password
        }
      });

    case "TOGGLE-EMAIL-FORM":
      return Object.assign({}, {
        login: { emailOpen: !state.login.emailOpen },
        emailForm: state.emailForm
      });

    default:
      return state;
  }
};

module.exports = loginReducer;
