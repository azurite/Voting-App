module.exports = {
  polls: {
    searchBar: {
      search: ""
    },
    polls: {
      polldata: [],
      isFetching: false,
      fetchSuccess: null,
      fetchError: null
    }
  },
  login: {
    login: {
      emailOpen: false
    },
    emailForm: {
      email: "",
      password: ""
    }
  },
  register: {
    email: {
      value: "",
      isValid: null
    },
    password: {
      value: "",
      isValid: null
    },
    password_confirm: {
      value: "",
      isValid: null
    }
  }
};
