import * as navigationTypes from "../constants/navigationTypes.js";

const initialState = {
  mainMenu: {
    moduleName: "",
    iconName: "",
    sync: true,
  },
  tabs: {
    siteName: "",
    items: [],
  },
};

export const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case navigationTypes.UPDATE_MAIN_MENU:
      return { ...state, mainMenu: {...state.mainMenu, moduleName: action.payload.mainMenu.moduleName, iconName: action.payload.mainMenu.iconName}};
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
    case navigationTypes.SYNC:
      return {
        ...state,
        mainMenu: { ...state.mainMenu, sync: action.payload.sync },
      };
    default:
      return state;
  }
};
