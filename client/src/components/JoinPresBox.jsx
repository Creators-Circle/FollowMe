import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import $ from 'jquery';
import lectureCheck from '../util/lectureCheck';
import { browserHistory } from 'react-router';
// takes a unique id as input and renders AudienceView for specific presentation
class JoinPresBox extends Component {
  constructor () {
    super();
    //  For preventing bruteforce upon login.
    this.failedLoginCount = 0;
  }

  componentDidMount () {
    // handles enter key being pressed while join input field is selected
    $('#join').keypress(function (e) {
      if (e.which === 13) {
        $('#joinButton').click();
        return false;
      }
    });
  }

  joinPresentation () {
    // Get lectureId from input box above join button
    let lectureId = $('#join').val();

    // check if lectureId exists and increment failcount if it fails.
      // Will logout on 10 failed login.
    lectureCheck(lectureId, (data) => {
      if (data.length === 0) {
        alert('Login failed.');
        $('#join').val('');
        this.failedLoginCount ++;
        if (this.failedLoginCount === 10) {
          this.failedLoginCount = 0;
          window.location.href = '/logout';
        }
      }
    });

    // Subscribe to custom namespace based on lectureId
    let socket = io(`/${lectureId}`);

    // Preserve the context of "this"
    let dispatch = this.props.dispatch;
    let userId = this.props.user.id;
    let request = {
      // userId will not be used, yet, but may play a role later
      // with more advanced permissions
      userId: this.props.user.id,
      name: this.props.user.name,
      lectureId: lectureId
    };
    // Alert the guest that they aren't allowed to join a given presentation
    socket.on('notAllowed', function () {
      $('#joinBox').append(`<h1>Guests not permitted to join ${lectureId}</h1>`);
      socket.disconnect();
    });

    // Listen for presentation URL response from presenter
    socket.on('presentationInfoResponse', function (presentationUrl, presentationName, presentationId,
      questions, thumbs, feedbackEnabled) {
      // Update store with presentation data and store socket reference
      dispatch({
        type: 'ASSIGN_LECTURE_ID',
        lectureId: lectureId,
        embedUrl: presentationUrl,
        socket: socket,
        name: presentationName,
        presentationId: presentationId
      });
      let lecture = {
        id: lectureId,
        name: presentationName,
        presentationId: presentationId,
        userId: userId,
        role: 'audience'
      };
      socket.emit('userLecture', lecture);
      console.log('questions: ', questions);
      // Dispatch all of the questions and displayed boolean into the store
      Object.keys(questions).slice(1).forEach((questionId) => {
        dispatch({
          type: 'CREATE_QUESTION',
          questionId: questionId,
          questionText: questions[questionId].questionText,
          votes: questions[questionId].votes
        });
      });

      if (questions.enabled) {
        dispatch({
          type: 'TOGGLE_ENABLED'
        });
      }
      // dispatch thumbs and displayed boolean into the store
      if (thumbs.displayed) {
        dispatch({
          type: 'TOGGLE_DISPLAY_THUMBS'
        });
        dispatch({
          type: 'SET_TOPIC',
          topicId: thumbs.topicId,
          topicName: thumbs.topicName
        });
      }
      console.log('feedbackEnabled: ', feedbackEnabled);
      // dispatch feedbackButton display boolean into the store
      if (!feedbackEnabled) {
        dispatch({
          type: 'TOGGLE_DISPLAY_FEEDBACK'
        });
      }
      // Redirect user to <AudienceView/>
      browserHistory.push('/audience');
    });
    // Emit request to server (and then to presenter) for presention URL
    socket.emit('presentationInfoRequest', request);
  }

  render () {
    return (
      <div id='joinBox'>
        <input id='join' type='text' /><br/>
        <button id='joinButton' onClick={this.joinPresentation.bind(this)}>Join a presentation</button>
      </div>
    );
  };
};

export default connect(state => state)(JoinPresBox);
