// connecting redux & mapping state to props.

import { connect } from 'react-redux';
import { changeReleaseDate } from '../../redux/actions/actions.js';
import Landing from './Landing.jsx';

const mapStateToProps = (state, routing) => {
  return {
    radioReleaseDate: state.radioReleaseDateState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeReleaseDate: (newReleaseDate) => {
      dispatch(changeReleaseDate(newReleaseDate));
    },
  };
};

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

export default LandingContainer;