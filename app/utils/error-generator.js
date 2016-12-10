const types = {
  ALREADY_REGISTERED: "You can't register while already registered",
  REGISTER_ERROR: "Unknown register Error. Please try again",
  ALREADY_LOGGED_IN: "You are aleady logged in",
  SEARCH_ERROR: "There was an error with the search",
  "CREATE_POLL_ERROR": "There was an error while saving the poll",
  "UNAUTHORIZED": "You're not authoriezed to communicate with this api",
  "UPDATE_POLL_INFO_ERROR": "An error happend while updateing our db",
  "EDIT_POLL_ERROR": "Your edits could not be saved",
  "DELETE_POLL_ERROR": "Your poll could not be deleted"
};

const registerErrors = {
  "UserExistsError": "This username is already taken"
};

function mapNameToMessage(err, type) {
  if(err) {
    switch(err.name) {
      case "UserExistsError":
        return registerErrors[name];

      default:
        return types[type];
    }
  }
  return types[type];
}

module.exports = {
  exec: function(type, err) {
    return {
      error: {
        message: mapNameToMessage(err, type),
        stack: process.env.NODE_ENV === "production" ? null : err
      }
    };
  }
};
