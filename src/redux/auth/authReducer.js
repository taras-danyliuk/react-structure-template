import * as types from "./authActionsTypes";


export const initialState = {
  userId: "",
  fullName: "",
  isAuthenticated: false,
  processing: false,
  token: "",
  error: "",
};


const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return {
        ...state,
        processing: true,
      };

    case types.HIDE_LOADING:
      return {
        ...state,
        processing: false,
      };

    case types.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        userId: action.response.userId || "",
        fullName: action.response.fullName || "",
        token: action.response.token || "",
        isAuthenticated: true,
        error: "",
      };

    case types.LOGIN_REQUEST_ERROR:
      return {
        ...state,
        error: action.error
      };

    case types.LOGOUT_REQUEST_SUCCESS:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default auth;
