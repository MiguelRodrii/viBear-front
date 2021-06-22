import * as toastTypes from "../constants/toast.js";

export const showToast = (typeMessage, message) => {
    return dispatch => {
        dispatch({ type: toastTypes.TOAST_SUCCESS, payload: { typeMessage, message } });
    };
};
export const hideToast = () => {
    return dispatch => {
        dispatch({ type: toastTypes.TOAST_HIDE });
    };
};

export const clearToast = () => {
    return dispatch => {
        dispatch({ type: toastTypes.TOAST_CLEAR });
    };
};
