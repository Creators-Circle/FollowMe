// Contains the elements for the Presenter, including:
  // TitleBar
    //  Is passed date from PresenterView props, lectureId from props, and
  // Slides
  // Timer
  // Menu of yet to be built modules
  // PulseBox Component
    // PulseBox is passed a startTime to represent the time at which the presentation is started,
    // which is assumed to be the time that the PresenterView renders

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PulseBox from './PulseBox';
import Slides from './Slides';
import $ from 'jquery';
import '../css/Presentation.css';
import SummaryView from './SummaryView';
import Timer from './Timer';
import Sidebar from './Sidebar';
import LogoutButton from './LogoutButton';
import TitleBar from './TitleBar';
import QuestionBox from './QuestionBox';
import PresThumbs from './PresThumbs';
import store from '../store.jsx';

class PresenterView extends Component {
  constructor () {
    super();
    this.date = new Date();
    this.state = {
      audience: 0
    };
  }

  componentDidMount () {
    let socket = this.props.activeLecture.socket;
    socket.on('presentationInfoRequest', function () {
      let lectureState = store.getState();
      console.log('presentationInfoRequest', store.getState());
      let presentationUrl = lectureState.activeLecture.embedUrl;
      let presentationName = lectureState.activeLecture.name;
      let presentationId = lectureState.activeLecture.presentationId;
      let questions = lectureState.questions;
      let thumbs = lectureState.thumbs;
      let feedbackEnabled = lectureState.feedbackButton.displayed;
    // Listen for audience request for presentation URL
      console.log('got a request for info');
      // response with presentation URL
      socket.emit('presentationInfoResponse',
        presentationUrl, presentationName, presentationId,
        questions, thumbs, feedbackEnabled
        );
    });

    socket.on('connected', () => {
      // Another User has connected
      // Need to increment the audience store
      this.setState({audience: ++this.state.audience});
    });

    // If an audience member has disconnected, update the state
    socket.on('disconnected', () => {
      // A user has left the lecture
      // Need to decrement the audience store (but not past 0)
      if (this.state.audience > 0) {
        this.setState({audience: --this.state.audience});
      }
    });
  }

  showStore () {
    console.log(store.getState());
  }

  render () {
    return (
      <div>
        <LogoutButton/>
        <div className='presenter-view'>
          <TitleBar className='title-bar'/>
          <Slides id="presenterSlides" role="presenter"/>
          <Sidebar />
          <Timer/>
          <PulseBox startTime={this.date} audience={this.state.audience}/>
          <QuestionBox role={'presenter'}/>
          <PresThumbs/>
          <button onClick={this.showStore.bind(this)}></button>
        </div>
      </div>
    );
  }
};

export default connect(state => state)(PresenterView);
