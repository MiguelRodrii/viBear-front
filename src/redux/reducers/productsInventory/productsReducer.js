import * as groupTypes from "../../constants/productsInventory/products.js";

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
      var products = null;
      if (state.products !== null) {
        products = state.products.slice();
        products.unshift(action.payload.createdProduct);
      }
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        products: products,
      };
    case groupTypes.CREATE_PRODUCT_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.GET_PRODUCTS_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        products: action.payload.products,
      };
    case groupTypes.GET_PRODUCTS_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.DELETE_PRODUCT_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        products: state.products.filter((element) => {
          return element.id !== action.payload.deletedProductId;
        }),
      };
    case groupTypes.DELETE_PRODUCT_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.UPDATE_PRODUCT_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.UPDATE_PRODUCT_SUCCESS:
      var result = state.products.find((element) => {
        return element.id === action.payload.updatedProduct.id;
      });
      result.purchase_price = action.payload.updatedProduct.purchase_price;
      result.sale_price = action.payload.updatedProduct.sale_price;
      result.current_amount = action.payload.updatedProduct.current_amount;
      result.product_definition =
        action.payload.updatedProduct.product_definition;
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
