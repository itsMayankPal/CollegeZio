// src/redux/Store.js

import { createStore, combineReducers } from "redux";
import { resourceReducer } from "./Reducers/resourceReducer";

// Combine reducers if you have more in future
const rootReducer = combineReducers({
  resourceState: resourceReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
