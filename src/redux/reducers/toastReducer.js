import * as toastTypes from "../constants/toast.js";
const initialState = {
    isOpen: false,
    typeMessage: "",
    message: ""
};
export const toastReducer = (state = initialState, action) => {
    switch (action.type) {
        case toastTypes.TOAST_SUCCESS:
            return {
                ...state,
                isOpen: true,
                typeMessage: action.payload.typeMessage,
                message: action.payload.message
            };
        case toastTypes.TOAST_HIDE:
            return {
                ...initialState
            };
        case toastTypes.TOAST_CLEAR:
            return {
                ...initialState
            };

        default:
            return state;
    }
};
