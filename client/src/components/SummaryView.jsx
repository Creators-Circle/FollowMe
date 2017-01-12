import React, { Component } from 'react';
import '../css/SummaryView.css';
import getLectureSummary from '../util/getLectureSummary';
import { connect } from 'react-redux';
import SummaryLeftPane from './SummaryLeftPane';
import LogoutButton from './LogoutButton';
import SummaryRightPane from './SummaryRightPane';

// View to display summary data about the presentation and users
class SummaryView extends Component {

  componentWillMount () {
    let lectureId = this.props.params.lectureId;
    // once this component loads, it gets the summary from the server and store it to the store
    getLectureSummary(lectureId, (summary) => {
      this.props.dispatch({
        type: 'UPDATE_SUMMARY',
        summary: summary
      });
    });
  }

  render () {
    if (this.props.summary) {
      return (
        <div>
        <Navbar/>
        <div>
          <h1><i className="fa fa-line-chart"></i>  Summary</h1>
          <SummaryLeftPane/>
          <SummaryRightPane/>
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

const mapStateToProps = (state) => {
  return {
    summary: state.summary,
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(SummaryView);
