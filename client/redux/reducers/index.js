import { combineReducers } from 'redux';
// setup react-router-redux
import { routerReducer } from 'react-router-redux';
import { timeState, radioReleaseDateState } from './timeState.js';

const appReducers = combineReducers({
  radioReleaseDateState,
  routing: routerReducer
});

export default appReducers;



// app state tree:

// state = {
//   radioReleaseDateState: moment,
// };