import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from './Question';

import $ from 'jquery';
import uuid from 'uuid/v1';
import { UpvoteQuestion,
         DownvoteQuestion,
         CreateQuestion,
         ToggleQuestions,
         ClearQuestions
       } from '../../../util/actions';

import '../../../css/QuestionBox.css';

class QuestionBox extends Component {
// This component lets users enter questions; it also displays each individual question component
  constructor (props) {
    super();
    const role = props.role;
    const upvoteQuestion = props.upvoteQuestion;
    const downvoteQuestion = props.downvoteQuestion;
    const createQuestion = props.createQuestion;
    this.socket = props.activeLecture.socket;
    this.socket.on('upvoteQuestion',
      (upvote, userId) => upvoteQuestion(upvote.questionId)
    );
    this.socket.on('downvoteQuestion',
      (downvote, userId) => downvoteQuestion(downvote.questionId)
    );
    this.socket.on('submitQuestion',
      question => createQuestion(question.questionId, question.questionText, null)
    );
  };

  componentDidMount () {
    const gottenPresentationInformation = true;
    let shouldClearQuestions = false;
    const toggleQuestions = this.props.toggleQuestions;
    const clearQuestions = this.props.clearQuestions;
    this.socket.on('questionToggle', () => {
      $('#QuestionBox, #QuestionBoxAudience').fadeToggle('slow');
      toggleQuestions();
      if (shouldClearQuestions) {
        $('.upvoteDownvote, questionText').detach();
        clearQuestions();
      }
      shouldClearQuestions = !shouldClearQuestions;
    });

    $('#questionInput').keypress((e) => {
      if (e.which === 13) {
        $('#submitQuestion').click();
        return false;
      }
    });
  }

  submitQuestion () {
    // dispatch, submission to the db, socket to the presenter
    const dispatch = this.props.dispatch;
    const questionText = $('#questionInput').val();
    const lectureId = this.props.activeLecture.lectureId;
    const userId = this.props.user.id;
    const questionId = uuid();
    const question = {
      questionId: questionId,
      lectureId: lectureId,
      userId: userId,
      questionText: questionText
    };
    if (questionText.length > 0) {
      this.socket.emit('submitQuestion', question);
      $('#questionInput').val('');
    } else {
    }
  }

  render () {
    const questions = this.props.questions;
    const questionsObj = {};
    const displayQuestions = questions.enabled ? 'block' : 'none';
    Object.keys(questions).forEach((questionKey) => {
      if (questionKey !== 'enabled') questionsObj[questionKey] = questions[questionKey];
    });
    if (this.props.role === 'presenter') {
      return (
        <div id='QuestionBox' style={{display: displayQuestions}}>
          <div id="QuestionBoxTitle"></div>
          <h2>Questions</h2>
          <hr/>
          <input className='form-control presenter-input' key={1} type="text" id="questionInput"></input>
          <button className='btn submit-btn' key={2} id="submitQuestion" onClick={this.submitQuestion.bind(this)}>Submit</button>
          {Object.keys(questionsObj).sort((a, b) => {
            if (questionsObj[a].votes < questionsObj[b].votes) return 1;
            return -1;
          }).map((questionId, i) =>
            <Question key={questionId} id={questionId} display={'block'} votes={questionsObj[questionId].votes} text={questionsObj[questionId].questionText}/>
          )}
        </div>
      );
    } else {
      return (
        <div id="QuestionBoxAudience" style={{display: displayQuestions}}>
          <span className="sidebar-header"><h2>QUESTIONS</h2></span>
          <div><input key={1} type="text" id="questionInput" className="form-control"/>
            <button key={2} id="submitQuestion" className='btn submit-btn' onClick={this.submitQuestion.bind(this)}>Ask</button>
          </div>
          {Object.keys(questionsObj).map((questionId, i) =>
            <Question key={i + 3} id={questionId} votes={questionsObj[questionId].votes} display='none' text={questionsObj[questionId].questionText}/>
          )}
          <hr/>
        </div>
      );
    }
  };
};

const mapStateToProps = ({ activeLecture, user, questions }) => {
  return {
    activeLecture,
    user,
    questions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upvoteQuestion: (questionId) => {
      dispatch(UpvoteQuestion(questionId));
    },
    downvoteQuestion: (questionId) => {
      dispatch(DownvoteQuestion(questionId));
    },
    createQuestion: (questionId, questionText, votes) => {
      dispatch(CreateQuestion(questionId, questionText, votes));
    },
    toggleQuestions: () => {
      dispatch(ToggleQuestions());
    },
    clearQuestions: () => {
      dispatch(ClearQuestions());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBox);
