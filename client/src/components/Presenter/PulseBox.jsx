import { connect } from 'react-redux';
import rd3 from 'rd3';
import timeDiffToMinutes from '../../util/timeDiffToMinutes';
import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/PulseBox.css';

// define LineChart component from react-d3
const LineChart = rd3.LineChart;
// this component is for displaying the live visualization of users' feedback
class PulseBox extends Component {

  render () {
    const currTime = new Date();
    const timeDiff = timeDiffToMinutes(this.props.startTime, currTime);

    // compare the time to 1 minute for testing
    // sort values to prevent backwards movement bug
    let filteredPulse = this.props.pulseData.filter(pulse => {
      return Math.abs(timeDiff - pulse.x) <= 1;
    }).sort((pulse1, pulse2) => pulse1.x - pulse2.x);
    // if filteredPulse is empty, populate it with a default 0,0 data point
    if (!filteredPulse.length) {
      filteredPulse = [{x: 0, y: 0}];
    }

    // set the min and max of x axis with the time value of the first element from filteredPulse
    const xMin = filteredPulse[0].x;
    const xMax = filteredPulse[0].x + 1;
    const audience = this.props.audience > 4 ? this.props.audience : 4;
    // if the number of clicks reaches 70% of number of audience, display a warning for the presenter
    if (filteredPulse[filteredPulse.length - 1].y > (audience * 0.70)) {
      $('.pulse-box').addClass('alert-red');
      setTimeout(() => {
        $('.pulse-box').removeClass('alert-red');
      }, 5000);
    }

    // need to set lineData prior to return statement to preserve "this" context
    const lineData = [
      {
        values: filteredPulse,
        strokeWidth: 2
      }
    ];
    // Render "stock ticker" style line graph
    return (
      <div id='PulseBox' className = "pulse-box">
      <span id="GraphTitle">Pulse
        <hr/>
        <LineChart
          className = 'pulsedata-linechart'
          data={lineData}
          width='100%'
          height='20%'
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 1200,
            height: 280
          }}
          circleRadius = {0}
          domain={
            // set the maximum value of x to the estimated time of presentation
            // set the maximum value of y to the number of audience members
            { x: [xMin, xMax], y: [0, audience] }
          }
          gridHorizontal={true}
          gridVertical={true}
        />
      </span>
      </div>
    );
  }

  // Add Socket.io listener for FeedbackButton increments (and subsequent decrements)
  componentWillMount () {
    // Set keyword this
    const socket = this.props.activeLecture.socket;
    const startTime = this.props.startTime;
    const dispatch = this.props.dispatch;
    // Socket event handler for an audience click that updates the presenter's pulse graph x axis
    socket.on('updatedPulse', (action, currTime) => {
      // compute the time difference and pass it with the action
      const timeDifference = timeDiffToMinutes(startTime, currTime);
      // Dispatch either DECREMENT or INCREMENT action
      dispatch({
        type: action,
        time: timeDifference
      });
    });
    // Socket event handler for an audience click that updates that audience member's array of clicks in the store
    socket.on('userClicked', (action, currTime, user) => {
      const timeDifference = timeDiffToMinutes(startTime, currTime);
      dispatch({
        type: action,
        time: timeDifference,
        user: user
      });
    });
  };
};

const mapStateToProps = ({ activeLecture, pulseData }) => {
  return {
    activeLecture,
    pulseData
  };
};

export default connect(mapStateToProps)(PulseBox);
