import { combineReducers } from "redux";
import { toastReducer } from "./toastReducer";
import {navigationReducer} from "./navigationReducer.js";

import { productsInventoryReducer } from "./productsInventory/index.js";

const reducers = combineReducers({
  toast: toastReducer,
  navigation: navigationReducer,
  productsInventory: productsInventoryReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
