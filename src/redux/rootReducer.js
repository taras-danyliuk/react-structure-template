/* istanbul ignore file */

import { combineReducers } from "redux";

import auth from "./auth/authReducer";


// Combine reducer into single one
const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
