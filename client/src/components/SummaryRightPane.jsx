import React, { Component } from 'react';
import { connect } from 'react-redux';

import SummaryMainPane from './SummaryMainPane';
import SummaryComment from './SummaryComment';

import rd3 from 'rd3';
import timeDiffToMinutes from '../util/timeDiffToMinutes';

const LineChart = rd3.LineChart;

class SummaryRightPane extends Component {
  constructor () {
    super();
    this.state = {
      lectureComment: ''
    };
  }

  upDateComment (id, comment) {
    this.setState({lectureComment: comment});
  }

  render () {
    // if userId is undefined display the lecture summary
    if (!this.props.userId) {
      // check if the summary is not empty
      const users = this.props.summary.users;
      if (users) {
        const comment = users.filter(user => user.role === 'presenter')[0].comment;
        return (
          <div className = 'lecture-summary col-md-7 offset-md-1'>
            <SummaryMainPane/>
            <SummaryComment
              comment={this.state.lectureComment || comment}
              upDateComment={this.upDateComment.bind(this)}
            />
          </div>
        );
      } else {
        return null;
      }
    } else {
      // else display user's summary
      const userId = this.props.userId;
      const name = this.props.summary.users.filter(user => user.user_id === userId)[0].name;
      const lecture = this.props.summary.lecture[0];
      const start = new Date(lecture.date);
      const end = new Date(lecture.end_time);
      // filter clicks by selected user
      const clicks = this.props.summary.clicks.filter(click => click.user_id === userId);
      const clicksPerMin = {};

      // compute the time difference and clicks per min
      clicks.map(click => timeDiffToMinutes(start, new Date(click.date)))
        .forEach((time) => {
          const min = Number(time.toString().split('.')[0]);
          clicksPerMin[min + 1] ? clicksPerMin[min + 1] += 1 : clicksPerMin[min + 1] = 1;
        });
      // add the time difference of start and end time of the presentation
      const startToEnd = timeDiffToMinutes(start, end);
      if (!clicksPerMin.hasOwnProperty((startToEnd) + 1)) clicksPerMin[(startToEnd) + 1] = 0;

      const clicksTimeline = [{x: 0, y: 0}];
      let maxClick = 0;
      // check the highest number of clicks, then convert click per minute to x & y format
      for (const min in clicksPerMin) {
        if (clicksPerMin[min] > maxClick) maxClick = clicksPerMin[min];
        clicksTimeline.push({x: Number(min), y: clicksPerMin[min]});
      }
      // set the maximum value of y and x axis of the line chart
      const maxAxisX = clicksTimeline[clicksTimeline.length - 1].x;
      const maxAxisY = maxClick < 8 ? 8 : maxClick + 1;

      const lineData = [
        {
          values: clicksTimeline,
          strokeWidth: 2
        }
      ];
      return (
        <div className ='user-summary-container container col-md-7 offset-md-1'>
          <div className = 'user-summary'>
            <h2 className='audience'>{name} <span onClick={ () => { this.props.displayUserSummary(); } }>
              <i className='fa fa-times-circle'></i>
            </span></h2>
            <SummaryMainPane userId={userId}/>
            <SummaryComment
              userId={userId}
              comment = {this.props.comment}
              upDateComment = {this.props.upDateComment}
            />
            <div className = 'user-pulse-container'>
              <LineChart
                className = 'user-pulse'
                data={lineData}
                width='100%'
                height='20%'
                viewBoxObject={{x: 0, y: 0, width: 800, height: 300}}
                circleRadius = {5}
                domain={{x: [0, maxAxisX], y: [0, maxAxisY]}}
                yAxisLabel="No. of Clicks"
                xAxisLabel="Elapsed Time (minutes)"
                gridHorizontal={true}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    summary: state.summary
  };
};
export default connect(mapStateToProps)(SummaryRightPane);
