import React, { Component } from 'react';

import PresenterView from './PresenterView';

import $ from 'jquery';
import timeDiffToMinutes from '../util/timeDiffToMinutes';

class PresenterViewContainer extends Component {
  constructor () {
    super();
    // set the start time when this compnent loads
    this.startTime = new Date();
    this.state = {
      time: undefined,
      duration: undefined,
      intervalId: ''
    };
  }

  componentDidMount () {
    this.timer();
    this.setState({intervalId: setInterval(this.timer.bind(this), 1000)});
  }

  timer () {
    // set the current date
    const time = new Date();
    const hours = time.getHours().toString();
    const minutes = time.getMinutes().toString();
    const seconds = time.getSeconds().toString();
    // format the current time
    const clock = `${this.parseTime(hours)} : ${this.parseTime(minutes)}`;
    // check the difference of start time and current time
    const diff = Math.abs(timeDiffToMinutes(this.startTime, time));
    this.setState({duration: this.convertDuration(diff)});
    this.setState({time: clock});
  }
  // function for computing the duration
  convertDuration (minutes) {
    const hours = Math.round(minutes / 60);
    const min = Math.round(minutes % 60);
    const sec = Math.round((minutes * 60) % 60);
    return `${this.parseTime(hours)} : ${this.parseTime(min)} : ${this.parseTime(sec)}`;
  }
  // function for formating time to a 2-digit number
  parseTime (time) {
    time = time.toString();
    if (time.length < 2) {
      return `0${time}`;
    }
    return time;
  }

  stopTimer () {
    clearInterval(this.state.intervalId);
  }

  render () {
    return (
      <div className = 'presenter'>
        <PresenterView time={this.state.time} duration={this.state.duration} stopTimer={this.stopTimer.bind(this)}/>
      </div>
    );
  }
}

export default PresenterViewContainer;
