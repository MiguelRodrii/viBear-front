import { combineReducers } from "redux";
import { toastReducer } from "./toastReducer";
import { ivaPercentagesReducer } from "./productsInventory/ivaPercentagesReducer";
import { productTypesReducer } from "./productsInventory/productTypesReducer";
import {productDefinitionsReducer} from "./productsInventory/productDefinitionsReducer";

const reducers = combineReducers({
  toast: toastReducer,
  ivaPercentages: ivaPercentagesReducer,
  productTypes: productTypesReducer,
  productDefinitions: productDefinitionsReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
