import React, { Component } from 'react';

import moment from 'moment';
import timeDiffToMinutes from '../../util/timeDiffToMinutes.js';

const PresThumbnail = ({ date, name, viewed }) => {
  const currDate = new Date();
  const lectureDate = new Date(date);
  // if the lecture's date is more than 7 days ago, format like 'Sun, Jan 1 2017 8:52 AM' else 'Today at 2:00pm'
  const formatDate = Math.abs(timeDiffToMinutes(currDate, lectureDate)) > 10080
    ? moment(lectureDate).format('llll') : moment(lectureDate).calendar();
  return (
      <div className='thumbnails'>
        {
          viewed ? <i className="fa fa-desktop"></i>
            : <i className="fa fa-line-chart"></i>
        }
        <p>{formatDate}</p>
        <p className='recent-presentation-title'><strong>{name}</strong></p>
      </div>
  );
};

export default PresThumbnail;
