// Contains the elements for the Audience, including:
  // Logout Button
  // FeedbackBox
  // Slides
  // FeedbackButton

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import $ from 'jquery';
import QuestionBox from './QuestionBox'; // also renders to presenter view
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AudThumbs from './AudThumbs';

class AudienceView extends Component {

  componentDidMount () {
    let thumbsDisplayed = false;
    // thumbsStore is not currently updating how it should be
    // leaving commented in in case we decide to use it
    // let dispatch = this.props.dispatch;
    // Socket event listener to trigger fade out
    let socket = this.props.activeLecture.socket;

    // Trigger questions box toggle
    // socket.on('questionToggle', function () {
    // });

    // open up 'thumbs' box
    socket.on('open thumbs', function (topicId, topic) {
      $('#thumbTopic').text(topic);
      $('#Thumbs').fadeToggle('slow');
      // this is not being used ... curently
      // dispatch({type: 'SET_TOPIC_ID', topicId: topicId});
      // this is not being used ... currently
      // dispatch({type: 'TOGGLE_DISPLAY'});
      thumbsDisplayed = !thumbsDisplayed;
    });

    // Trigger thumbs box to close if still open
    socket.on('close thumbs', function () {
      if (thumbsDisplayed) {
        $('#Thumbs').fadeToggle('slow');
        // dispatch({type: 'TOGGLE_DISPLAY'});
      }
      thumbsDisplayed = !thumbsDisplayed;
    });

    socket.on('stopPresentation', function () {
      browserHistory.push('/');
    });
  }

  render () {
    return (
      <div id="AudienceView">
      <LogoutButton/>
      <div>
        <Slides id="audienceSlides" class="slides" role="audience"/>
        <FeedbackBox/>
        <QuestionBox/>
        <AudThumbs/>
      </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture,
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(AudienceView);
