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
      username: "",
      password: ""
    },
    reqPending: false,
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
    },
    username: {
      value: "",
      isValid: null
    },
    reqPending: false,
    err: null
  },
  profile: {
    editorOpen: false,
    editorContent: {
      isNewPoll: null,
      id: null,
      title: "",
      options: [],
      newOption: ""
    },
    editDisabled: false,
    deleteDisabled: false,
    createDisabled: false,
    isSaving: false,
    err: null,
    isDeleting: false,
    deleteErr: null
  },
  user: null,
  preloadedPoll: null
};
