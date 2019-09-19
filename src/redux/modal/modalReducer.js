import * as types from "./modalActionsTypes";


const initialState = {
  isOpen: false,
  content: null,
  styles: null,
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        content: action.content,
        ...action.styles || {},
      };

    case types.CLOSE_MODAL:
      return {
        isOpen: false,
        content: null,
        styles: null
      };

    default:
      return state;
  }
};

export default modal;
