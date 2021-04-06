import { combineReducers } from "redux";
import { toastReducer } from "./toastReducer";
import { ivaPercentagesReducer } from "./productsInventory/ivaPercentagesReducer";
import { productTypesReducer } from "./productsInventory/productTypesReducer";
import {productDefinitionsReducer} from "./productsInventory/productDefinitionsReducer";
import { productsReducer } from "./productsInventory/productsReducer";
import {expirationDatesReducer} from "./productsInventory/expirationDatesReducer";

const reducers = combineReducers({
  toast: toastReducer,
  ivaPercentages: ivaPercentagesReducer,
  productTypes: productTypesReducer,
  productDefinitions: productDefinitionsReducer,
  products: productsReducer,
  expirationDates: expirationDatesReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
