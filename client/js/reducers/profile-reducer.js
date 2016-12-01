const types = require("../actions/action-manifest");
// option is always an object of the form { option: "vote option", votes: 0 }
const profileReducer = function(state, action) {
  var pollcpy, nextState;
  switch(action.type) {
    case types.EDIT_POLL:
      pollcpy = Object.assign({}, action.poll);
      return Object.assign({}, {
        editorOpen: true,
        editorContent: {
          title: pollcpy.body.title,
          options: pollcpy.body.options,
          newOption: ""
        },
        deleteDisabled: true,
        createDisabled: true,
        isSaving: state.isSaving,
        success: state.success,
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
      nextState.success = null;
      return nextState;

    case types.SAVE_SUCCESS:
      return Object.assign({}, {
        editorOpen: false,
        editorContent: {
          title: "",
          options: [],
          newOption: ""
        },
        deleteDisabled: false,
        createDisabled: false,
        isSaving: false,
        success: true,
        err: null
      });

    case types.SAVE_ERROR:
      return Object.assign({}, {
        editorOpen: true,
        editorContent: state.editorContent,
        deleteDisabled: true,
        createDisabled: true,
        isSaving: false,
        success: false,
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
      nextState.deleteDisabled = false;
      nextState.createDisabled = false;
      return nextState;

    default:
      return state;
  }
};

module.exports = profileReducer;
