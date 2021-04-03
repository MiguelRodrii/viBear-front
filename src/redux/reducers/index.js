import { combineReducers } from "redux";
import { productoReducer } from "./productoReducer";

const reducers = combineReducers({
    producto: productoReducer
});

const rootReducer = (state, action) => {
    return reducers(state,action);
};

export default rootReducer;