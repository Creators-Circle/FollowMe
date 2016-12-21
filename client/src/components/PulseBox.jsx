// this component is for displaying the live visualization of users' feedback
import { connect } from 'react-redux';
import rd3 from 'rd3';
import timeDiffToMinutes from '../util/timeDiffToMinutes';
import React, { Component } from 'react';
// define LineChart component from react-d3
const LineChart = rd3.LineChart;

// pass the pulseData coming from redux store
class PulseBox extends Component {

  // this function is for calling a dispatch to increment the number the pulseData
  render () {
    var lineData = [
      {
        values: this.props.pulseData,
        strokeWidth: 3
      }
    ];

    return (
      <div>
        <p>Pulse Box</p>
        <LineChart
          className = 'pulsedata-linechart'
          data={lineData}
          width='100%'
          height={400}
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 1200,
            height: 200
          }
          }
          circleRadius = {0}
          domain={
            // set the maximum value of x to the estimated time of presentation
            // set the maximum value of y to the number of audience
            { x: [0, 20], y: [0, 18] }
          }
          xAxisLabel="Elapsed Time (minutes)"
          gridHorizontal={true}
        />
      </div>
    );
  }

  componentWillMount () {
    let startTime = this.props.presentationStartTime;
    let dispatch = this.props.dispatch;
    socket.on('updatedPulse', function (action, currTime) {
      // compute the time difference and pass it with the action
      console.log('ACTION: ', action);
      console.log('CURR TIME: ', currTime);
      let timeDifference = timeDiffToMinutes(startTime, currTime);
      dispatch({
        type: action,
        time: timeDifference
      });
    });
  }
};

// get the pulseData from redux store
// REFACTOR LATER
// const mapStatetoProps = (state) => {
//   return {
//     pulseData: state.pulseData,
//     presentationStartTime: state.presentationStartTime
//   };
// };
export default connect(state => state)(PulseBox);
