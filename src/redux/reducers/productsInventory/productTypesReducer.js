import * as groupTypes from "../../actions/productsInventory/types/productTypes";

const initialState = {
  loading: false,
  success: false,
  productTypes: null,
};

export const productTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.CREATE_PRODUCT_TYPE_LOADING:
        console.log("Loading with:", action.payload.loading)
      return { ...state, loading: action.payload.loading };
    case groupTypes.CREATE_PRODUCT_TYPE_SUCCESS:
        console.log("Success with:", action.payload.loading, action.payload.success)
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.CREATE_PRODUCT_TYPE_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
