/*
 * action types
 */

export const actionTypes = {
  CHANGE_APPSTATE: 'CHANGE_APPSTATE',
  CHANGE_RELEASEDATE: 'CHANGE_RELEASEDATE',
};

/*
 * other constants
 */

export const appStates = {
  LANDING_PAGE: 'LANDING_PAGE'
};

/*
 * action creators
 */

export function changeAppState(appState) {
  return { type: actionTypes.CHANGE_APPSTATE, appState };
}

export function changeReleaseDate(releaseDate) {
  return { type: actionTypes.CHANGE_RELEASEDATE, releaseDate };
}