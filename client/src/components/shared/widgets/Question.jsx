import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ToggleQuestionUpvoted } from '../../../util/actions';

class Question extends Component {

  toggleUpvote () {
    const userId = this.props.user.id;
    const questionId = this.props.id;
    const socket = this.props.activeLecture.socket;
    // toggle the upvoted property in store for this question
    const upvoteDownvote = this.props.questions[this.props.id].upvoted ? 'downvoteQuestion' : 'upvoteQuestion';
    // Build an upvote object to pass to the database
    const question = {
      userId: userId,
      questionId: questionId
    };
    // Emit an event that a question was upvoted or downvoted
    socket.emit(upvoteDownvote, question, userId);
    // Update the store to reflect that an upvote/downvote has been fired
    this.props.toggleQuestionUpvoted(this.props.id);
  };

  render () {
    const upvoteImg = this.props.questions[this.props.id].upvoted ? './img/arrows_up-green.svg' : './img/arrows_up.svg';
    return (
      <div className='question' onClick={this.toggleUpvote.bind(this)}>
        <div className='voteContainer'>
          <img src={upvoteImg} className='upvoteDownvote'/>
          <div className='questionVotes'>{this.props.votes}</div>
          </div>
        <span className='questionText'>{this.props.text}</span>
      </div>
    );
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
    toggleQuestionUpvoted: (questionId) => {
      dispatch(ToggleQuestionUpvoted(questionId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
