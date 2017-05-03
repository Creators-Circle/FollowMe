import React, { Component } from 'react';
import moment from 'moment';

import PresenterView from './PresenterView';

import timeDiffToMinutes from '../../util/timeDiffToMinutes';

class PresenterViewContainer extends Component {
  constructor () {
    super();
    // set the start time when this compnent loads
    this.startTime = new Date();
    this.state = {
      clock: undefined,
      duration: undefined,
      intervalId: ''
    };
  }

  componentDidMount () {
    this.timer();
    this.setState({intervalId: setInterval(this.timer.bind(this), 1000)});
  }

  timer () {
    const clock = moment().format('HH:mm');
    // check the difference of start time and current time
    // const diff = Math.abs(timeDiffToMinutes(this.startTime, time));
    const diffToMiliseconds = moment().diff(this.startTime);
    const newMoment = new moment.duration(diffToMiliseconds);
    let newHours = Math.floor(newMoment.asHours()).toString();
    let newMinutes = (Math.floor(newMoment.asMinutes()) % 60).toString();
    let newSeconds = (Math.floor(newMoment.asSeconds()) % 60).toString();
    // force two digits for time values
    newHours = newHours.length < 2 ? `0${newHours}` : newHours;
    newMinutes = newMinutes.length < 2 ? `0${newMinutes}` : newMinutes;
    newSeconds = newSeconds.length < 2 ? `0${newSeconds}` : newSeconds;
    const duration = `${newHours}:${newMinutes}:${newSeconds}`;
    this.setState({ duration, clock });
  }

  stopTimer () {
    clearInterval(this.state.intervalId);
  }

  render () {
    return (
      <div className = 'presenter'>
        <PresenterView time={this.state.clock} duration={this.state.duration} stopTimer={this.stopTimer.bind(this)}/>
      </div>
    );
  }
}

export default PresenterViewContainer;
