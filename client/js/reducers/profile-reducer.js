const types = require("../actions/action-manifest");
const copy = require("../utils/copy");

const profileReducer = function(state, action) {
  var nextState;
  switch(action.type) {
    case types.CREATE_POLL:
      return Object.assign({}, {
        editorOpen: true,
        editorContent: {
          isNewPoll: true,
          id: null,
          title: "",
          options: [],
          newOption: ""
        },
        editDisabled: true,
        deleteDisabled: true,
        createDisabled: true,
        isSaving: state.isSaving,
        err: state.err,
        isDeleting: state.isDeleting,
        deleteErr: state.deleteErr,
        delAccError: null
      });

    case types.EDIT_POLL:
      return Object.assign({}, {
        editorOpen: true,
        editorContent: {
          isNewPoll: false,
          id: action.poll.id,
          title: action.poll.body.title,
          options: copy(action.poll.body.options),
          newOption: ""
        },
        editDisabled: true,
        deleteDisabled: true,
        createDisabled: true,
        isSaving: state.isSaving,
        err: state.err,
        isDeleting: state.isDeleting,
        deleteErr: state.deleteErr,
        delAccError: null
      });

    case types.UPDATE_POLL_INPUT:
      nextState = Object.assign({}, state);
      nextState.editorContent = {
        isNewPoll: state.editorContent.isNewPoll,
        id: state.editorContent.id,
        options: state.editorContent.options,
        title: action.field === "title" ? action.value : state.editorContent.title,
        newOption: action.field === "newOption" ? action.value : state.editorContent.newOption
      };
      return nextState;

    case types.ADD_OPTION:
      nextState = Object.assign({}, state);
      nextState.editorContent.options = [action.option].concat(nextState.editorContent.options);
      nextState.editorContent.newOption = "";
      nextState.err = null;
      return nextState;

    case types.REMOVE_OPTION:
      nextState = Object.assign({}, state);
      nextState.editorContent.options = nextState.editorContent.options.filter((opt) => {
        return opt.option !== action.option.option;
      });
      return nextState;

    case types.SAVE_EDIT:
      nextState = Object.assign({}, state);
      nextState.isSaving = true;
      nextState.err = null;
      return nextState;

    case types.SAVE_SUCCESS:
      return Object.assign({}, {
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
        isDeleting: state.isDeleting,
        deleteErr: state.deleteErr,
        delAccError: state.delAccError
      });

    case types.SAVE_ERROR:
      return Object.assign({}, {
        editorOpen: true,
        editorContent: state.editorContent,
        editDisabled: true,
        deleteDisabled: true,
        createDisabled: true,
        isSaving: false,
        err: action.err,
        isDeleting: state.isDeleting,
        deleteErr: state.deleteErr,
        delAccError: state.delAccError
      });

    case types.CANCEL_EDIT:
      nextState = Object.assign({}, state);
      nextState.editorOpen = false;
      nextState.editorContent = {
        isNewPoll: null,
        id: null,
        title: "",
        options: [],
        newOption: ""
      };
      nextState.editDisabled = false;
      nextState.deleteDisabled = false;
      nextState.createDisabled = false;
      nextState.err = null;
      return nextState;

    case types.DELETE_POLL:
      return Object.assign({}, state, {
        editDisabled: true,
        deleteDisabled: true,
        createDisabled: true,
        isDeleting: { id: action.id },
        deleteErr: null,
        delAccError: null
      });

    case types.DELETE_SUCCESS:
      return Object.assign({}, state, {
        editDisabled: false,
        deleteDisabled: false,
        createDisabled: false,
        isDeleting: false,
        deleteErr: null
      });

    case types.DELETE_ERROR:
      return Object.assign({}, state, {
        editDisabled: false,
        deleteDisabled: false,
        createDisabled: false,
        isDeleting: false,
        deleteErr: { for: action.id, data: action.err }
      });

    case types.DELETE_ACCOUNT_ERROR:
      return Object.assign({}, state, {
        delAccError: action.err
      });

    default:
      return state;
  }
};

module.exports = profileReducer;
