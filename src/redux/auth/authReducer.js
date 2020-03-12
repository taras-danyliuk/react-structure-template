import Cookies from "universal-cookie";
import * as types from "./authActionsTypes";

// Get token from cookies, if it is in there than we keep user authenticated
const cookies = new Cookies();


export const initialState = {
  userId: "",
  fullName: "",
  role: "",
  isAuthenticated: !!cookies.get("token"),
  processing: false,
  error: null,
};


const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_PROCESSING:
      return {
        ...state,
        processing: action.payload,
      };

    case types.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        role: "User",
        error: null,
      };

    case types.REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.id,
        error: null,
      };

    case types.LOGOUT_REQUEST_SUCCESS:
      return {
        ...initialState,
        isAuthenticated: false
      };

    case types.AUTH_REQUEST_ERROR:
      return {
        ...state,
        error: action.error
      };

    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default auth;
