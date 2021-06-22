import { combineReducers } from "redux";
import { ivaPercentagesReducer } from "./ivaPercentagesReducer";
import { productTypesReducer } from "./productTypesReducer";
import {productDefinitionsReducer} from "./productDefinitionsReducer";
import { productsReducer } from "./productsReducer";
import {expirationDatesReducer} from "./expirationDatesReducer";

export const productsInventoryReducer = combineReducers({
  ivaPercentages: ivaPercentagesReducer,
  productTypes: productTypesReducer,
  productDefinitions: productDefinitionsReducer,
  products: productsReducer,
  expirationDates: expirationDatesReducer
});
