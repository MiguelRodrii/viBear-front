import * as groupTypes from "../../actions/productsInventory/types/productTypes";

const initialState = {
  loading: false,
  success: false,
  productTypes: null,
};

export const productTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.CREATE_PRODUCT_TYPE_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.CREATE_PRODUCT_TYPE_SUCCESS:
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
    case groupTypes.GET_PRODUCT_TYPES_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.GET_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        sucess: action.payload.success,
        productTypes: action.payload.productTypes,
      };
    case groupTypes.GET_PRODUCT_TYPES_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.DETELE_PRODUCT_TYPE_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.DETELE_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.DETELE_PRODUCT_TYPE_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
