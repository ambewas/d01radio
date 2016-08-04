import { actionTypes } from '../actions/actions.js';
import moment from 'moment';
const radioReleaseDate = moment().add(1000, 'seconds');

export const radioReleaseDateState = (state = radioReleaseDate, action) => {
  switch (action.type) {
  case actionTypes.CHANGE_RELEASEDATE:
    return action.releaseDate;
  default:
    return state;
  }
};
