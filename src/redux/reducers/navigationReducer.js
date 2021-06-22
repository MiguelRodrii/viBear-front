import * as navigationTypes from "../constants/navigationTypes.js";

const initialState = {
  mainMenu: {
    moduleName: "",
    iconName: "",
  },
  tabs: {
    siteName: "",
    items: [],
  },
};

export const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case navigationTypes.UPDATE_MAIN_MENU:
      return { ...state, mainMenu: action.payload.mainMenu };
    case navigationTypes.UPDATE_TABS_SITE_NAME:
      return {
        ...state,
        tabs: { ...state.tabs, siteName: action.payload.siteName },
      };
    case navigationTypes.UPDATE_TABS_ITEMS:
      return {
        ...state,
        tabs: { ...state.tabs, items: action.payload.items },
      };
    default:
      return state;
  }
};
