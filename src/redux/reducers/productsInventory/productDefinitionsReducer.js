import * as groupTypes from "../../constants/productsInventory/productDefinitions.js";

const initialState = {
  loading: false,
  success: false,
  productDefinitions: null,
};

export const productDefinitionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.CREATE_PRODUCT_DEFINITION_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.CREATE_PRODUCT_DEFINITION_SUCCESS:
      var productDefinitions = null;
      if (state.productDefinitions !== null) {
        productDefinitions = state.productDefinitions.slice();
        productDefinitions.unshift(action.payload.createdProductDefinition);
      }
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        productDefinitions: productDefinitions,
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
        productDefinitions: action.payload.productDefinitions,
      };
    case groupTypes.GET_PRODUCT_DEFINITIONS_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.DELETE_PRODUCT_DEFINITION_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.DELETE_PRODUCT_DEFINITION_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        productDefinitions: state.productDefinitions.filter(
          (element) => element.id !== action.payload.deletedProductDefinitionId
        ),
      };
    case groupTypes.DELETE_PRODUCT_DEFINITION_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.UPDATE_PRODUCT_DEFINITION_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.UPDATE_PRODUCT_DEFINITION_SUCCESS:
      var found = state.productDefinitions.find(
        (element) => element.id === action.payload.updatedProductDefinition.id
      );
      found.name = action.payload.updatedProductDefinition.name;
      found.description = action.payload.updatedProductDefinition.description;
      found.product_type = action.payload.updatedProductDefinition.product_type;
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.UPDATE_PRODUCT_DEFINITION_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
