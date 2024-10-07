// src/Redux/Reducers/index.js
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import resourceReducer from "./resourceReducer"; // Assuming you have a resource reducer

const rootReducer = combineReducers({
  user: userReducer,
  resources: resourceReducer, // Combine other reducers
});

export default rootReducer;
