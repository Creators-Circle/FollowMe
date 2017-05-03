import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import FeedbackBox from './FeedbackBox';
import Slides from '../shared/Widgets/Slides';
import Navbar from '../shared/Navbar/Navbar';

import { ChangeRole } from '../../util/actions';

class AudienceView extends Component {

  componentDidMount () {
    const socket = this.props.activeLecture.socket;
    this.props.changeRole('audience');
    socket.on('stopPresentation', () => {
      socket.disconnect();
      browserHistory.push('/');
    });
  };

  render () {
    return (
      <div id="AudienceView">
        <Navbar/>
        <div id="SlidesContainer">
          <Slides id="audienceSlides" class="slides" role="audience" />
        </div>
        <div id="FeedbackBoxContainer">
          <FeedbackBox/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ activeLecture }) => {
  return {
    activeLecture
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeRole: role => dispatch(ChangeRole(role))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudienceView);
