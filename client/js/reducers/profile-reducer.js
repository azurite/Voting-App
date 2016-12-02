const types = require("../actions/action-manifest");
const copy = require("../utils/copy");

const profileReducer = function(state, action) {
  var nextState;
  switch(action.type) {
    case types.CREATE_POLL:
      return Object.assign({}, {
        editorOpen: true,
        editorContent: {
          title: "",
          options: [],
          newOption: ""
        },
        editDisabled: true,
        deleteDisabled: true,
        createDisabled: true,
        isSaving: state.isSaving,
        err: state.err
      });

    case types.EDIT_POLL:
      return Object.assign({}, {
        editorOpen: true,
        editorContent: {
          title: action.poll.body.title,
          options: copy(action.poll.body.options),
          newOption: ""
        },
        editDisabled: true,
        deleteDisabled: true,
        createDisabled: true,
        isSaving: state.isSaving,
        err: state.err
      });

    case types.UPDATE_POLL_INPUT:
      nextState = Object.assign({}, state);
      nextState.editorContent = {
        options: state.editorContent.options,
        title: action.field === "title" ? action.value : state.editorContent.title,
        newOption: action.field === "newOption" ? action.value : state.editorContent.newOption
      };
      return nextState;

    case types.ADD_OPTION:
      nextState = Object.assign({}, state);
      nextState.editorContent.options = [action.option].concat(nextState.editorContent.options);
      nextState.editorContent.newOption = "";
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
          title: "",
          options: [],
          newOption: ""
        },
        editDisabled: false,
        deleteDisabled: false,
        createDisabled: false,
        isSaving: false,
        err: null
      });

    case types.SAVE_ERROR:
      return Object.assign({}, {
        editorOpen: true,
        editorContent: state.editorContent,
        editDisabled: true,
        deleteDisabled: true,
        createDisabled: true,
        isSaving: false,
        err: action.err
      });

    case types.CANCEL_EDIT:
      nextState = Object.assign({}, state);
      nextState.editorOpen = false;
      nextState.editorContent = {
        title: "",
        options: [],
        newOption: ""
      };
      nextState.editDisabled = false;
      nextState.deleteDisabled = false;
      nextState.createDisabled = false;
      return nextState;

    default:
      return state;
  }
};

module.exports = profileReducer;
