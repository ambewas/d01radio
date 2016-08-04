import React, { Component } from 'react';
import classnames from 'classnames';
import ReactAudioPlayer from 'react-audio-player';
import test from '../../../public/audio/test.mp3';
import style from './style.scss';
import { timeLeft } from '../../helpers/moments.js';
import moment from 'moment';
import { Button } from 'react-toolbox';


export class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: this._getTimeLeft()
    };

    this._setTimeLeft = this._setTimeLeft.bind(this);
    this._testTime = this._testTime.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this._setTimeLeft, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    this._checkToStartPlayer();
  }

  _getTimeLeftText() {
    const now = moment();
    return timeLeft(now, this.props.radioReleaseDate);
  }

  _getTimeLeft() {
    const now = moment();
    const endTime = this.props.radioReleaseDate;
    return endTime.diff(now, 'milliseconds');
  }

  _setTimeLeft() {
    this.setState({
      timeLeft: this._getTimeLeft()
    });
  }

  _renderHero() {
    const paragraph = this.state.timeLeft <= 0 ? 'Listen to these sweet beats!' : 'We will start rocking in:';
    const time = this.state.timeLeft <= 0 ? null : <p>{this._getTimeLeftText()}</p>;
    return (
      <div className="pj-margin-large-bottom">
        <h1>{'D01 Radio'}</h1>
        <p>{paragraph}</p>
        {time}
      </div>
    );
  }

  _checkToStartPlayer() {
    if (this.state.timeLeft <= 0) {
      this.refs.player.audioEl.play();
    }
  }

  _testTime() {
    this.props.changeReleaseDate(moment().add(3, 'seconds'));
  }

  render() {
    return (
      <div>
        <Button
          onClick={this._testTime}
          raised
          primary
        >
          {'set timer to test seconds'}
        </Button>
        <div className="pj-absolute-center pj-textalign-center">
          {this._renderHero()}
          {this.state.timeLeft <= 0 ?
            <ReactAudioPlayer
              ref="player"
              src={test}
              autoPlay={false}
            /> : null }
        </div>
      </div>
    );
  }
}

Landing.displayName = 'landing page';
Landing.propTypes = {
  appState: React.PropTypes.string
};

export default Landing;

