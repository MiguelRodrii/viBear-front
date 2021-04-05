import * as groupTypes from "../../actions/productsInventory/types/productDefinitions";

const initialState = {
  loading: false,
  success: false,
  productDefinitions: [],
};

export const productDefinitionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.CREATE_PRODUCT_DEFINITION_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.CREATE_PRODUCT_DEFINITION_SUCCESS:
      state.productDefinitions.push(action.payload.createdProductDefinition);
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.CREATE_PRODUCT_DEFINITION_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.GET_PRODUCT_DEFINITIONS_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.GET_PRODUCT_DEFINITIONS_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        productDefinitions: action.payload.productDefinitions
      };
    case groupTypes.GET_PRODUCT_DEFINITIONS_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
