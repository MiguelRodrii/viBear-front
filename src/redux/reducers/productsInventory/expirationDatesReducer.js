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
    case groupTypes.GET_EXPIRATION_DATES_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.GET_EXPIRATION_DATES_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        expirationDates: action.payload.expirationDates,
      };
    case groupTypes.GET_EXPIRATION_DATES_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.DELETE_EXPIRATION_DATE_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.DELETE_EXPIRATION_DATE_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
        expirationDates: state.expirationDates.filter((element) => {
          return element.id !== action.payload.deletedExpirationDateId;
        }),
      };
    case groupTypes.DELETE_EXPIRATION_DATE_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.UPDATE_EXPIRATION_DATE_LOADING:
      return { ...state, loading: action.payload.loading };
    case groupTypes.UPDATE_EXPIRATION_DATE_SUCCESS:
      const result = state.expirationDates.find((element) => {
        return element.id === action.payload.updatedExpirationDate.id;
      });
      if (result !== undefined) {
        result.value = action.payload.updatedExpirationDate.value;
      } else {
        state.expirationDates.push(action.payload.updatedExpirationDate);
      }
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    case groupTypes.UPDATE_EXPIRATION_DATE_FAILED:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return { ...state };
  }
};
