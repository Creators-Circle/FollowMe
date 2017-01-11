import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import $ from 'jquery';
import uuid from 'uuid/v1';
import store from '../store.jsx';

class QuestionBox extends Component {
// This component lets users enter questions; it also displays each individual question component
  constructor (props) {
    super();
    let dispatch = props.dispatch;
    let render = this.forceUpdate.bind(this);
    this.socket = props.activeLecture.socket;
    let role = props.role;
    console.log('role is: ', role);
    this.socket.on('upvoteQuestion', function (upvote, userId) {
      dispatch({
        type: 'UPVOTE',
        questionId: upvote.questionId
      });
      render();
    });
    this.socket.on('downvoteQuestion', function (downvote, userId) {
      dispatch({
        type: 'DOWNVOTE',
        questionId: downvote.questionId
      });
      render();
    });
    this.socket.on('submitQuestion', function (question) {
      dispatch({
        type: 'CREATE_QUESTION',
        questionText: question.questionText,
        questionId: question.questionId
      });
      render();
    });
    console.log('questions: ', store.getState().questions);
  };

  componentDidMount () {
    let dispatch = this.props.dispatch;
    let clearQuestions = false;
    this.socket.on('questionToggle', function () {
      $('#QuestionBox').fadeToggle('slow');
      if (clearQuestions) {
        $('.upvoteDownvote, questionText').detach();
        dispatch({type: 'CLEAR_QUESTIONS'});
      }
      clearQuestions = !clearQuestions;
    });

    $('#questionInput').keypress(function (e) {
      if (e.which === 13) {
        $('#submitQuestion').click();
        return false;
      }
    });
  }

  submitQuestion (e) {
    // dispatch, submission to the db, socket to the presenter
    let socket = this.props.activeLecture.socket;
    let dispatch = this.props.dispatch;
    let questionText = $('#questionInput').val();
    let lectureId = this.props.activeLecture.lectureId;
    let userId = this.props.user.id;
    let questionId = uuid();
    let question = {
      questionId: questionId,
      lectureId: lectureId,
      userId: userId,
      questionText: questionText
    };
    socket.emit('submitQuestion', question);
    $('#questionInput').val('');
  }

  render () {
    let questions = store.getState().questions;
    let displayQuestions = questions.enabled ? 'block' : 'none';
    // Assign an id to the main component div so that it can be targeted on toggle events
    if (this.props.role === 'presenter') {
      return (
        <div id="QuestionBox" style={{display: 'none'}}>
          <input key={1} type="text" id="questionInput"></input>
          <button key={2} id="submitQuestion" onClick={this.submitQuestion.bind(this)}>Submit</button>
          {Object.keys(questions).slice(1).sort(function (a, b) {
            if (questions[a].votes < questions[b].votes) return 1;
            return -1;
          }).map((questionId, i) =>
            <Question key={i + 3} id={questionId} votes={questions[questionId].votes} text={questions[questionId].questionText}/>
          )}
        </div>
      );
    } else {
      return (
        <div id="QuestionBox" style={{display: displayQuestions}}>
          <input key={1} type="text" id="questionInput"></input>
          <button key={2} id="submitQuestion" onClick={this.submitQuestion.bind(this)}>Submit</button>
          {Object.keys(questions).slice(1).map((questionId, i) =>
            <Question key={i + 3} id={questionId} votes={questions[questionId].votes} text={questions[questionId].questionText}/>
          )}
        </div>
      );
    }
  };
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture,
    user: state.user,
    questions: state.questions
  };
};

export default connect(mapStateToProps)(QuestionBox);
