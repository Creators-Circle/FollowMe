import { connect } from 'react-redux';
import React, { Component } from 'react';
import $ from 'jquery';

class FeedbackButton extends Component {

  render () {
    return this.props.feedbackButton.displayed ? (
      <div id="updatePulse"><img id="question" className="navbarElement" src='./img/question.png'/><br/><div id="FeedbackButtonText">DID NOT GROK</div></div>
    ) : (
      <div id="updatePulse" style={{display: 'none'}}><img id="question" className="navbarElement" src='./img/question.png'/><br/><div id="FeedbackButtonText">DID NOT GROK</div></div>
    );
  }

  componentDidMount () {
    let canIncrement = true;
    let resetCode;
    const socket = this.props.activeLecture.socket;
    const name = this.props.user.name;
    const userId = this.props.user.id;
    const lectureId = this.props.activeLecture.lectureId;
    document.getElementById('updatePulse').addEventListener('click', () => {
      // If button has not been clicked in last 30 seconds,
      // then fire "increment" event and queue "decrement" event
      socket.emit('userClick', 'ADDCLICKTOUSER', new Date(), name, userId, lectureId);
      if (canIncrement) {
        socket.emit('updatePulse', 'INCREMENT', new Date());
        decrement();
        canIncrement = false;
      } else {
        resetDecrement();
      }
    });
    socket.on('feedbackToggle', () => {
      $('#updatePulse').fadeToggle('slow');
    });
    const decrement = () => {
      // In '30' seconds, emit "decrement" event
      // Capture reset code for setTimeout and store in resetCode
      resetCode = setTimeout(() => {
        socket.emit('updatePulse', 'DECREMENT', new Date());
        canIncrement = true;
      }, 5000);
    };

    const resetDecrement = () => {
      clearTimeout(resetCode); // use clearTimeout to kill the other setTimeout
      decrement(); // fire another setTimeout instead.
    };
  }
}

const mapStatetoProps = ({ user, activeLecture, feedbackButton }) => {
  return {
    user,
    activeLecture,
    feedbackButton
  };
};

export default connect(mapStatetoProps)(FeedbackButton);
