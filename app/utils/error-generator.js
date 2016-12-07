const types = {
  ALREADY_REGISTERED: "You can't register while already registered",
  REGISTER_ERROR: "Unknown register Error. Please try again",
  ALREADY_LOGGED_IN: "You are aleady logged in"
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
