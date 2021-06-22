import * as groupTypes from "../../constants/productsInventory/ivaPercentages.js";

const initialState = {
  loading: false,
  success: false,
  ivaPercentages: null,
};

export const ivaPercentagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.GET_IVA_PERCENTAGES_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.GET_IVA_PERCENTAGES_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        ivaPercentages: action.payload.ivaPercentages
      };
    case groupTypes.GET_IVA_PERCENTAGES_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success
      };
    default:
      return { ...state };
  }
};
