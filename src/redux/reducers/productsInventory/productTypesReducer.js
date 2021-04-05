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
    case groupTypes.DELETE_PRODUCT_TYPE_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.DELETE_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        productTypes: state.productTypes.filter(
          (element) => element.id !== action.payload.deletedProductTypeId
        ),
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.DELETE_PRODUCT_TYPE_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.UPDATE_PRODUCT_TYPE_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.UPDATE_PRODUCT_TYPE_SUCCESS:
      let productType = state.productTypes.find(
        (element) => element.id === action.payload.updateProductType.id
      );
      productType.name = action.payload.updateProductType.name;
      productType.is_expirable = action.payload.updateProductType.is_expirable;
      productType.iva_percentage =
        action.payload.updateProductType.iva_percentage;
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.UPDATE_PRODUCT_TYPE_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
