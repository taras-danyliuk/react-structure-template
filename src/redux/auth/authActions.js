import * as types from "./authActionsTypes";


//set auth state of application: true = is logged in, false = no user is logged in
export const loginRequest = data => {
  return { type: types.LOGIN_REQUEST, data };
};

export const logout = () => {
  return { type: types.LOGOUT_REQUEST };
};

export const registerRequest = ({ data, formName }) => {
  return { type: types.REGISTER_REQUEST, data, formName };
};
