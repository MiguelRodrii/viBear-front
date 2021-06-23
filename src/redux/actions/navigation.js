import * as navigationTypes from "../constants/navigationTypes.js";

export const updateMainMenu = (moduleName, iconName) => (dispatch) => {
  try {
    dispatch({
      type: navigationTypes.UPDATE_MAIN_MENU,
      payload: { mainMenu: { moduleName: moduleName, iconName: iconName } },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTabsSiteName = (siteName) => (dispatch) => {
  try {
    dispatch({
      type: navigationTypes.UPDATE_TABS_SITE_NAME,
      payload: { siteName: siteName },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTabsItems = (items) => (dispatch) => {
  try {
    dispatch({
      type: navigationTypes.UPDATE_TABS_ITEMS,
      payload: { items: items },
    });
  } catch (error) {
    console.log(error);
  }
};

export const sync = (sync) => dispatch => {
  try {
      dispatch({type: navigationTypes.SYNC, payload: {sync: sync}});
  } catch (error) {
      console.log(error);
  }
};