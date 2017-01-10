import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import $ from 'jquery';

// AudThumbs allows audience members to give feedback when the presenter enables to 'thumbs' poll component.
  // This allows the presenter to see how each audience member feels about a specific topic/question.

//  TODO:  Find graphics

class AudThumbs extends Component {

  componentDidMount () {
    // console.log('this.props in AudThumbs', this.props);
    $('#Thumbs').toggle();
    let socket = this.props.socket;
    let userId = this.props.userId;
    // set currentTopicId from store, but it's not updating as expected
    // leaving it commented for now in case we use store later on.
    let currentTopicId; /* = this.props.topicId; */
    // let dispatch = this.props.dispatch;
    // We have redundant socket listeners here.
    // This is a patch until store is working
    socket.on('open thumbs', (topicId, topic) => currentTopicId = topicId);
    $('.thumbButton').click(function (e) {
      // get direction of thumb that was chosen
      let thumbChoice = $(this)[0].id;
      // emit choice to the server / presenter / database
      socket.emit('thumb clicked', currentTopicId, userId, thumbChoice);
      // fade out component and set 'displayed' property to false in the store
      $('#Thumbs').fadeOut(1);
      // dispatch toggle_thumbs_box . This is not being used ... currently
      // dispatch({type: 'TOGGLE_DISPLAY'});
    });
  }

  render () {
    return (
      <div id="Thumbs">
        <h1 id="thumbTopic"></h1>
        <button className='thumbButton' id='up'>Thumbs up!</button>
        <button className='thumbButton' id='side'>Thumbs to the side!</button>
        <button className='thumbButton' id='down'>Thumbs Down!</button>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.activeLecture.socket,
    userId: state.user.id,
    topicId: state.thumbs.topicId,
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(AudThumbs);
