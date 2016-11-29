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
    },
    reqPending: false,
    user: null,
    err: null
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
  },
};
