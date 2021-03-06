const types = require("../actions/action-manifest");

const loginReducer = function(state, action) {
  switch(action.type) {
    case types.UPDATE_LOGIN_INPUT:
      return Object.assign({}, {
        login: state.login,
        emailForm: {
          username: action.field === "username" ? action.input : state.emailForm.username,
          password: action.field === "password" ? action.input : state.emailForm.password
        },
        reqPending: state.reqPending,
        err: state.err
      });

    case types.TOGGLE_EMAIL_FORM:
      return Object.assign({}, {
        login: { emailOpen: !state.login.emailOpen },
        emailForm: state.emailForm,
        reqPending: state.reqPending,
        err: state.err
      });

    case types.REQUEST_LOGIN:
      return Object.assign({}, {
        login: state.login,
        emailForm: state.emailForm,
        reqPending: true,
        err: null
      });

    case types.LOGIN_SUCCESS:
      return Object.assign({}, {
        login: state.login,
        emailForm: {
          username: "",
          password: ""
        },
        reqPending: false,
        err: null
      });

    case types.LOGIN_FAILURE:
      return Object.assign({}, {
        login: state.login,
        emailForm: {
          username: "",
          password: ""
        },
        reqPending: false,
        err: action.err
      });

    case types.LOGOUT:
      return Object.assign({}, {
        login: state.login,
        emailForm: state.emailForm,
        reqPending: state.reqPending,
        err: state.err
      });

    default:
      return state;
  }
};

module.exports = loginReducer;
