//import * as groupTypes from "../actions/types/producto";

const initialState = {
    loading: false,
    success: false,
    productsList: null
};

// export const productoReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case groupTypes.GET_PRODUCTOS_LOADING:
//             return { ...state, loading: action.payload.loading };
//         case groupTypes.GET_PRODUCTOS_SUCCESS:
//             return {
//                 ...state,
//                 loading: action.payload.loading,
//                 success: action.payload.success,
//                 productsList: action.payload.productsList 
//             };
//         default:
//             return { ...state };
//     }
// };