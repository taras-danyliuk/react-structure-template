import { combineReducers } from "redux";

import auth from "./auth/authReducer";
import modal from "./modal/modalReducer";


// Combine reducer into single one
const rootReducer = combineReducers({
  auth,
  modal
});

export default rootReducer;
