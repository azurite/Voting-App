const actions = {
  //login-reducer
  UPDATE_LOGIN_INPUT: "UPDATE_LOGIN_INPUT",
  TOGGLE_EMAIL_FORM: "TOGGLE_EMAIL_FORM",
  REQUEST_LOGIN: "REQUEST_LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  //polls-reducer
  FETCH_POLLS: "FETCH_POLLS",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  UPDATE_SEARCH: "UPDATE_SEARCH",
  //register-reducer
  UPDATE_REGISTER_INPUT: "UPDATE_REGISTER_INPUT",
  VALIDATE_REGISTER_INPUT: "VALIDATE_REGISTER_INPUT",
  //profileReducer
  CREATE_POLL: "CREATE_POLL",
  EDIT_POLL: "EDIT_POLL",
  UPDATE_POLL_INPUT: "UPDATE_POLL_INPUT",
  ADD_OPTION: "ADD_OPTION",
  REMOVE_OPTION: "REMOVE_OPTION",
  SAVE_EDIT: "SAVE_EDIT",
  SAVE_SUCCESS: "SAVE_SUCCESS",
  SAVE_ERROR: "SAVE_ERROR",
  CANCEL_EDIT: "CANCEL_EDIT"
};

module.exports = actions;
