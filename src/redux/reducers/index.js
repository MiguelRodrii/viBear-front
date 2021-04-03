import { combineReducers } from "redux";
import {ivaPercentagesReducer} from "./productsInventory/ivaPercentagesReducer";

const reducers = combineReducers({
    ivaPercentages: ivaPercentagesReducer
});

const rootReducer = (state, action) => {
    return reducers(state,action);
};

export default rootReducer;