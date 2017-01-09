import FeedbackBox from './FeedbackBox';
import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
// sidebar menu for presenter to toggle modules and use additional functionality
class Sidebar extends Component {

  componentDidMount () {
    // Capture the this context
    let socket = this.props.activeLecture.socket;
    let lectureId = this.props.activeLecture.lectureId;
    let thumbsToggle = false; // not sure if this is gonna work???
    let dispatch = this.props.dispatch;

    // When ComponentToggle is clicked:
      // ToggleFade the Component out of the PresenterView
      // And/or emit a ComponentToggle event to tell the AudienceView to toggleFade the Component

    $('#questionToggle').on('click', function () {
      socket.emit('questionToggle');
      $('#QuestionBox').fadeToggle('slow');
    });

    // Toggle in/out 'Thumbs' component
    $('#thumbsToggle').on('click', function () {
    // If thumbs component isn't toggled, then toggle it in
      if (!thumbsToggle) {
        $('#Thumbs').fadeToggle('slow');
      } else { // if already visible, toggle it out
        $('#Thumbs').fadeToggle('slow');
        socket.emit('close thumbs'); // emit event to close all audience thumbs components
        $('#topic').val();
        dispatch({type: 'CLEAR_TOPIC'}); // dispatch action to clear store of thumb data
      }
      thumbsToggle = !thumbsToggle; // toggle boolean value of thumbsToggle
    });

    $('#timerToggle').on('click', function () {
      $('#Timer').fadeToggle('slow');
    });

    $('#pulseToggle').on('click', function () {
      $('#PulseBox').fadeToggle('slow');
    });

    $('#feedbackToggle').on('click', function () {
      socket.emit('feedbackToggle');
    });

    // Events that end the presentation should alert the audience and server
    $('#stopPresentation, #exit').on('click', function () {
      let endTime = new Date();
      let endLecture = {
        id: lectureId,
        endTime: endTime
      };
      socket.emit('stopPresentation', endLecture);
    });
  }

  render () {
    // console.log('this.props in Sidebar: ', this.props)
    let embedUrl = this.props.activeLecture.embedUrl;
    return (
      <div>
        <Link id='exit' to='/summary'><button id="exit">X</button></Link>
        <a href={embedUrl} target="_blank"><button>Projector</button></a>
        <button id='timerToggle'>Timer</button>
        <button id='questionToggle'>Question</button>
        <button id='thumbsToggle'>Thumbs</button>
        <button id='pulseToggle'>Pulse</button>
        <button id='feedbackToggle'>Feedback</button>
        <Link id='summary' to='/summary'><button>Summary</button></Link>
        <Link id='stopPresentation' to='/summary'><button>Stop Presentation</button></Link>
      </div>
    );
  }
};

const mapStatetoProps = (state) => {
  return {
    activeLecture: state.activeLecture,
    dispatch: state.dispatch
  };
};

export default connect(mapStatetoProps)(Sidebar);
