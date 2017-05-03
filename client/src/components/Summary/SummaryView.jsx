import React, { Component } from 'react';
import { connect } from 'react-redux';

import SummaryLeftPane from './SummaryLeftPane';
import SummaryRightPane from './SummaryRightPane';
import Navbar from '../shared/Navbar/Navbar';

import { UpdateSummary } from '../../util/actions';

import '../../css/SummaryView.css';

class SummaryView extends Component {

  componentWillMount () {
    const lectureId = this.props.params.lectureId;
    // once this component loads, it gets the summary from the server and store it to the store
    this.props.updateSummary(lectureId);
  }

  render () {
    if (this.props.summary) {
      return (
        <div>
          <Navbar/>
          <div className='container-fluid summary-main'>
            <h1 className='summary-title'>
              <i className="fa fa-line-chart"></i>
              Summary: <span>{ this.props.summary.lecture === undefined
                ? '' : this.props.summary.lecture[0].name }</span>
            </h1>
            <div className='row'>
              <SummaryLeftPane/>
              <SummaryRightPane/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <p>rendering</p>
      );
    }
  }
}

const mapStateToProps = ({ summary }) => {
  return {
    summary
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSummary: (lectureId) => {
      dispatch(UpdateSummary(lectureId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryView);
