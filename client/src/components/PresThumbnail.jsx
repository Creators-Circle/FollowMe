import React, { Component } from 'react';

import moment from 'moment';
import timeDiffToMinutes from '../util/timeDiffToMinutes.js';

class PresThumbnail extends Component {

  render () {
    const currDate = new Date();
    const lectureDate = new Date(this.props.date);
    // if the lecture's date is more than 7 days ago, format like 'Sun, Jan 1 2017 8:52 AM' else 'Today at 2:00pm'
    const formatDate = Math.abs(timeDiffToMinutes(currDate, lectureDate)) > 10080
      ? moment(lectureDate).format('llll') : moment(lectureDate).calendar();
    return (
        <div className='thumbnails'>
          {
            this.props.viewed ? <i className="fa fa-desktop"></i>
              : <i className="fa fa-line-chart"></i>
          }
          <p>{formatDate}</p>
          <p className='recent-presentation-title'><strong>{this.props.name}</strong></p>
        </div>
    );
  };
};

export default PresThumbnail;
