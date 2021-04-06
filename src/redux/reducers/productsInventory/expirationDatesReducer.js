import * as groupTypes from "../../actions/productsInventory/types/expirationDates";

const initialState = {
  loading: false,
  success: false,
  expirationDates: null,
};

export const expirationDatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.CREATE_EXPIRATION_DATE_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.CREATE_EXPIRATION_DATE_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.CREATE_EXPIRATION_DATE_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
