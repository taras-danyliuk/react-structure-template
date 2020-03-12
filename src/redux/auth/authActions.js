import * as types from "./authActionsTypes";


//set auth state of application: true = is logged in, false = no user is logged in
export const loginRequest = data => {
  return { type: types.LOGIN_REQUEST, payload: data };
};

export const logoutRequest = () => {
  return { type: types.LOGOUT_REQUEST };
};

export const registerRequest = data => {
  return { type: types.REGISTER_REQUEST, payload: data };
};

export const clearErrorAction = () => {
  return { type: types.CLEAR_ERROR }
};
