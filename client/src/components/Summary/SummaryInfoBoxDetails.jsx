import React, { Component } from 'react';

import SummaryInfoBoxDetail from './SummaryInfoBoxDetail.jsx';

const SummaryInfoBoxDetails = () => (
  <div className='summary-info-box-details-container'>
    <div className='summary-info-box-details'>
      <h1>{this.props.title}</h1>
      <ul>
      {
        this.props.details.map((detail, i) =>
          <SummaryInfoBoxDetail key={i} detail={detail} />
        )
      }
      </ul>
      <button className='btn btn-green close-btn'
              onClick={() => { this.props.toggleView(false); }}
      ><i className="fa fa-close"></i> Close</button>
    </div>
  </div>
);

export default SummaryInfoBoxDetails;
