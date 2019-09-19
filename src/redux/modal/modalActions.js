import * as types from "./modalActionsTypes";


export const openModal = (content, styles = null) => {
  return {
    type: types.OPEN_MODAL,
    content,
    styles
  }
};

export const closeModal = () => {
  return { type: types.CLOSE_MODAL }
};
