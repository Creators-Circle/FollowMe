import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import io from 'socket.io-client';
import $ from 'jquery';

import lectureCheck from '../../util/lectureCheck';

import { AssignLectureId,
         CreateQuestion,
         ToggleQuestions,
         ToggleThumbs,
         SetThumbsTopic,
         ToggleFeedback
       } from '../../util/actions';

// takes a unique id as input and renders AudienceView for specific presentation
class JoinPresBox extends Component {
  constructor () {
    super();
    //  For preventing bruteforce upon login.
    this.failedLoginCount = 0;
  }

  componentDidMount () {
    // handles enter key being pressed while join input field is selected
    $('#join, #joinInputGuest').keypress((e) => {
      if (e.which === 13) {
        $('#joinButton').click();
        return false;
      }
    });
  }

  joinPresentation () {
    // Get lectureId from input box above join button
    const lectureId = this.props.role === 'guest' ? $('#joinInputGuest').val() : $('#join').val();

    // check if lectureId exists and increment failcount if it fails.
      // Will logout on 10 failed login.
    lectureCheck(lectureId, (data) => {
      if (data.length === 0) {
        window.alert('Login failed.');
        this.failedLoginCount ++;
        if (this.failedLoginCount === 10) {
          this.failedLoginCount = 0;
          window.location.href = '/logout';
        }
      }
    });

    // Subscribe to custom namespace based on lectureId
    const socket = io(`/${lectureId}`);

    // Preserve the context of "this"
    const props = this.props;
    const userId = this.props.user.id;
    const request = {
      // userId will not be used, yet, but may play a role later
      // with more advanced permissions
      userId: this.props.user.id,
      name: this.props.user.name,
      lectureId: lectureId
    };
    // Alert the guest that they aren't allowed to join a given presentation
    socket.on('notAllowed', () => {
      $('#joinBox, #joinInputGuestContainer').append(`<h1>Guests not permitted to join ${lectureId}</h1>`);
      socket.disconnect();
    });

    // Listen for presentation URL response from presenter
    socket.on('presentationInfoResponse',
      (presentationUrl, presentationName, presentationId, questions, thumbs, feedbackEnabled) => {
        // Update store with presentation data and store socket reference
        props.assignLectureId(lectureId, presentationUrl, socket, presentationName, presentationId);
        const lecture = {
          id: lectureId,
          name: presentationName,
          presentationId: presentationId,
          userId: userId,
          role: 'audience'
        };
        socket.emit('userLecture', lecture);
        // Dispatch all of the questions and displayed boolean into the store
        // Enabled key:value will also be dispatched as a question but will not
        // effect the store
        Object.keys(questions).forEach((questionId) => {
          if (questionId !== 'enabled') {
            props.createQuestion(questionId, questions[questionId].questionText, questions[questionId].votes);
          };
        });
        if (questions.enabled) {
          props.toggleQuestions();
        }
        // dispatch thumbs and displayed boolean into the store
        if (thumbs.displayed) {
          props.toggleThumbs();
          props.setThumbsTopic(thumbs.topicId, thumbs.topicName);
        }
        // dispatch feedbackButton display boolean into the store
        if (!feedbackEnabled) {
          props.toggleFeedback();
        }
        socket.removeListener('presentationInfoResponse');
        // Redirect user to <AudienceView/>
        browserHistory.push('/audience');
      });
    // Emit request to server (and then to presenter) for presention URL
    socket.emit('presentationInfoRequest', request);
  };

  render () {
    return this.props.role === 'guest'
    ? (
      <div id='joinInputGuestContainer'>
        <input className='form-control' id='joinInputGuest' type='text' />
        <button className='btn btn-blue' id='joinButton' onClick={this.joinPresentation.bind(this)}>Submit</button>
      </div>
    ) : (
      <div id='joinBox'>
        <input className='form-control input-form join-form' id='join' type='text' placeholder='Enter Code'/><br/>
        <button className='btn side-presentation-btn submit-btn' id='joinButton' onClick={this.joinPresentation.bind(this)}>Join a presentation</button>
      </div>
    );
  };
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  assignLectureId (lectureId, embedUrl, socket, name, presentationId) {
    dispatch(AssignLectureId(lectureId, embedUrl, socket, name, presentationId));
  },
  createQuestion (questionId, questionText, votes) {
    dispatch(CreateQuestion(questionId, questionText, votes));
  },
  toggleQuestions () {
    dispatch(ToggleQuestions());
  },
  toggleThumbs () {
    dispatch(ToggleThumbs());
  },
  setThumbsTopic (id, name) {
    dispatch(SetThumbsTopic(id, name));
  },
  toggleFeedback () {
    dispatch(ToggleFeedback());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinPresBox);
