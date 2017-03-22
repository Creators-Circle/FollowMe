import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../store.jsx';

import LogoutButton from './LogoutButton';
import Navbar from './Navbar';
import PresThumbs from './PresThumbs';
import PulseBox from './PulseBox';
import QuestionBox from './QuestionBox';
import Slides from './Slides';
import SummaryView from './SummaryView';
import Sidebar from './Sidebar';
import TitleBar from './TitleBar';

import $ from 'jquery';

import '../css/Presentation.css';

class PresenterView extends Component {
  constructor (props) {
    super(props);
    this.date = new Date();
    this.state = {
      audience: 0
    };
    const socket = props.activeLecture.socket;
    socket.on('presentationInfoRequest', () => {
      const presentationUrl = props.activeLecture.embedUrl;
      const presentationName = props.activeLecture.name;
      const presentationId = props.activeLecture.presentationId;
      const questions = store.getState().questions;
      const thumbs = store.getState().thumbs;
      const feedbackEnabled = store.getState().feedbackButton.displayed;
      // Listen for audience request for presentation URL
      // response with presentation URL
      socket.emit('presentationInfoResponse',
        presentationUrl, presentationName, presentationId,
        questions, thumbs, feedbackEnabled
      );
    });

    socket.on('connected', () => {
      // Another User has connected
      // Need to increment the audience state
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

    socket.on('stopPresentation', () => {
      socket.disconnect();
    });
  }

  render () {
    return (
      <div className = 'presenter-view-container'>
        <Navbar/>
        <div className='container presentation-view'>
          <div className='row'>
            <div className='col-md-9 pulse-row'>
                <PulseBox startTime={this.date} audience={this.state.audience}/>
                <div id="QuestionBoxPresenter">
                  <QuestionBox role={'presenter'}/>
                </div>
                  <PresThumbs/>
            </div>
            <div className='col-md-3 col-lg-3 sidebar-row'>
              <Sidebar time={this.props.time} duration={this.props.duration} stopTimer={this.props.stopTimer}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default connect(state => state)(PresenterView);
