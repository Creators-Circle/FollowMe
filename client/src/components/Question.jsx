import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
// This renders each question in the store with an upvote button
// each question receives its text and ID as props from QuestionBox
class Question extends Component {

  toggleUpvote () {
    let render = this.forceUpdate.bind(this);
    let socket = this.props.activeLecture.socket;
    // toggle the upvoted property in store for this question
    let upvoteDownvote = this.props.questions[this.props.id].upvoted ? 'downvoteQuestion' : 'upvoteQuestion';
    // Build an upvote object to pass to the database
    let question = {
      userId: this.props.user.id,
      questionId: this.props.id
    };
    // Emit an event that a question was upvoted or downvoted
    socket.emit(upvoteDownvote, question);
    // Update the store to reflect that an upvote/downvote has been fired
    this.props.dispatch({
      type: 'TOGGLE_UPVOTED',
      questionId: this.props.id
    });
    render();
  }

  render () {
    let buttonText = this.props.questions[this.props.id].upvoted ? 'Downvote' : 'Upvote';
    // console.log('this.props in question', this.props);
    return (
      <div className='question'>
       <button className='upvoteDownvote' id={this.props.text} onClick={this.toggleUpvote.bind(this)}>{buttonText}</button>
       <span className='questionText'>{this.props.text}</span>
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

export default connect(mapStateToProps)(Question);
