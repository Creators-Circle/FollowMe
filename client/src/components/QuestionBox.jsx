import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import $ from 'jquery';
import uuid from 'uuid/v1';

class QuestionBox extends Component {
// This component lets users enter questions; it also displays each individual question component
  constructor (props) {
    super();
    let dispatch = props.dispatch;
    let render = this.forceUpdate.bind(this);
    this.socket = props.activeLecture.socket;
    this.socket.on('upvoteQuestion', function (upvote) {
      dispatch({
        type: 'UPVOTE',
        questionId: upvote.questionId
      });
      render();
    });
    this.socket.on('downvoteQuestion', function (downvote) {
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
  }

  componentDidMount () {
    let dispatch = this.props.dispatch;
    let clearQuestions = false;
    this.socket.on('questionToggle', function () {
      $('#QuestionBox').fadeToggle('slow');
      if (clearQuestions) {
        $('.upvoteDownvote, questionText').remove();
        dispatch({type: 'CLEAR_QUESTIONS'});
      }
    });
    clearQuestions = !clearQuestions;
  }

  submitQuestion () {
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
    // Capture 'this' context
    let questions = this.props.questions;
    // Assign an id to the main component div so that it can be targeted on toggle events
    return (
      <div id="QuestionBox" style={{display: 'none'}}>
        <input type="text" id="questionInput"></input>
        <button id="submitQuestion" onClick={this.submitQuestion.bind(this)}>Submit</button>
        {Object.keys(questions).sort(function (a, b) {
          if (questions[a].votes < questions[b].votes) return 1;
          return -1;
        }).map((questionId, i) =>
          <Question key={i} id={questionId} text={questions[questionId].questionText}/>
        )}
      </div>
    );
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
