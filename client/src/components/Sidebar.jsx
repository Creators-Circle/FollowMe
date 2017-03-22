import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeedbackBox from './FeedbackBox';
import TitleBar from './TitleBar';

import $ from 'jquery';
import { ToggleThumbs, ClearThumbsTopic, ToggleFeedback } from '../util/actions';
import store from '../store';

import '../css/Sidebar.css';

class Sidebar extends Component {

  componentDidMount () {
    const socket = this.props.activeLecture.socket;
    const lectureId = this.props.activeLecture.lectureId;
    let thumbsToggle = false; // not sure if this is gonna work???
    let guestsPermitted = false;
    const toggleThumbs = this.props.toggleThumbs;
    const clearThumbsTopic = this.props.clearThumbsTopic;
    const toggleFeedback = this.props.toggleFeedback;
    const stopTimer = this.props.stopTimer;
    // When ComponentToggle is clicked:
    // ToggleFade the Component out of the PresenterView
    // And/or emit a ComponentToggle event to tell the AudienceView to toggleFade the Component

    $('#questionToggle').on('click', () => {
      socket.emit('questionToggle');
    });

    // Toggle in/out 'Thumbs' component
    $('#thumbsToggle').on('click', () => {
      // update the store as well
      toggleThumbs();
    // If thumbs component isn't toggled, then toggle it in
      if (!thumbsToggle) {
        $('#PresThumbs').fadeToggle('slow');
      } else { // if already visible, toggle it out and reset it
        $('#PresThumbs').fadeToggle('fast');
        $('#topicTitle').text('Topic: ');
        $('#topic').val('');
        $('#topic, #setTopic').fadeIn();
        socket.emit('close thumbs'); // emit event to close all audience thumbs components
        clearThumbsTopic();
      }
      thumbsToggle = !thumbsToggle; // toggle boolean value of thumbsToggle
    });

    $('#timerToggle').on('click', () => {
      $('.timer').fadeToggle('slow');
    });

    $('#pulseToggle').on('click', () => {
      $('#PulseBox').fadeToggle('slow');
    });

    $('#feedbackToggle').on('click', () => {
      toggleFeedback();
      socket.emit('feedbackToggle');
    });

    $('#guestsToggle').on('click', () => {
      const lecture = {
        lectureId: lectureId,
        guestsPermitted: !guestsPermitted
      };
      socket.emit('guestsToggle', lecture);
      guestsPermitted = true;
    });

    // Events that end the presentation should alert the audience and server
    $('#stopPresentation, #exit').on('click', () => {
      stopTimer();
      const endTime = new Date();
      const endLecture = {
        id: lectureId,
        endTime: endTime
      };
      socket.emit('stopPresentation', endLecture);
    });
  }

  render () {
    const embedUrl = this.props.activeLecture.embedUrl;
    return (
      <div id="Sidebar">
        <ul>
          <li><TitleBar className='title-bar'/></li>
          <div className='timer'>
            <div className='clock'>{this.props.time}</div>
            <div className='sidebar-header'>
              <h2>DURATION</h2>
              <p>{this.props.duration}</p>
            </div>
            <hr/>
          </div>
        </ul>
        <div className='container'/>

          <div className='row tools-row allow-guest'>
            <span>Permit Guests<input type="checkbox" id='guestsToggle'></input></span>
          </div>
          <hr/>

          <div className='row tools-row '>
            <div className='offset-md-1'>
              <a href={embedUrl} target="_blank"><button className='btn tool-btn btn'><span>Projector</span><i className="fa fa-desktop"></i></button></a>
              <button id='timerToggle' className='tool-btn btn'><span>Timer</span><i className="fa fa-clock-o"></i></button>
            </div>
          </div>

          <div className='row tools-row '>
            <button id='questionToggle' className='tool-btn btn'><span>Questions</span><i className="fa fa-question-circle-o"></i></button>
            <button id='thumbsToggle' className='tool-btn btn'><span>Thumbs</span><i className="fa fa-thumbs-up"></i></button>
          </div>

          <div className='row tools-row '>
            <button id='pulseToggle' className='tool-btn btn'><span>Pulse</span><i className="fa fa-line-chart"></i></button>
            <button id='feedbackToggle' className='tool-btn btn'><span>Not Grok</span><i className="fa fa-exclamation"></i></button>
          </div>

          <div className='row tools-row '>
            <Link to={`/summary/${this.props.activeLecture.lectureId}`}>
              <button id='stopPresentation' className='btn btn-red' >
                <i className="fa fa-times"></i> Stop Presentation
              </button>
            </Link>
          </div>

      </div>
    );
  }
};

const mapStatetoProps = (state) => {
  return {
    activeLecture: state.activeLecture
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleThumbs: () => {
      dispatch(ToggleThumbs());
    },
    clearThumbsTopic: () => {
      dispatch(ClearThumbsTopic());
    },
    toggleFeedback: () => {
      dispatch(ToggleFeedback());
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Sidebar);
