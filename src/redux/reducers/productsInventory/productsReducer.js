import * as groupTypes from "../../actions/productsInventory/types/products";

const initialState = {
  loading: false,
  success: false,
  products: null,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.CREATE_PRODUCT_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.CREATE_PRODUCT_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
