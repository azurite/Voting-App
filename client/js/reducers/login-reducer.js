const types = require("../actions/action-manifest");

const loginReducer = function(state, action) {
  switch(action.type) {
    case types.UPDATE_LOGIN_INPUT:
      return Object.assign({}, {
        login: state.login,
        emailForm: {
          email: action.field === "email" ? action.input : state.emailForm.email,
          password: action.field === "password" ? action.input : state.emailForm.password
        },
        reqPending: state.reqPending,
        user: state.user,
        err: state.err
      });

    case types.TOGGLE_EMAIL_FORM:
      return Object.assign({}, {
        login: { emailOpen: !state.login.emailOpen },
        emailForm: state.emailForm,
        reqPending: state.reqPending,
        user: state.user,
        err: state.err
      });

    case types.REQUEST_LOGIN:
      return Object.assign({}, {
        login: state.login,
        emailForm: state.emailForm,
        reqPending: true,
        user: state.user,
        err: null
      });

    case types.LOGIN_SUCCESS:
      return Object.assign({}, {
        login: state.login,
        emailForm: {
          email: "",
          password: ""
        },
        reqPending: false,
        user: action.user,
        err: null
      });

    case types.LOGIN_FAILURE:
      return Object.assign({}, {
        login: state.login,
        emailForm: {
          email: "",
          password: ""
        },
        reqPending: false,
        user: null,
        err: action.err
      });

    default:
      return state;
  }
};

module.exports = loginReducer;
