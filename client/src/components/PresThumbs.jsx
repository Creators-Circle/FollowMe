import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import $ from 'jquery';

// PresThumbs requests feedback from audience members and renders the results of that data.
  // Audience members are prompted for feedback with the AudThumbs component.

//  TODO:  Find graphics

class PresThumbs extends Component {

  componentDidMount () {
    // retain 'this' context
    let dispatch = this.props.dispatch;
    let render = this.forceUpdate.bind(this);
    // socket listener for when an audience member clicks on a thumb
    this.props.socket.on('thumb clicked', function (thumbChoice) {
      // increment the total tally in the store for the thumb chosen
      dispatch({type: 'THUMB_CLICKED', thumbChoice: thumbChoice});
      // trigger a re-render
      render();
    });

    // handles enter key being pressed while topic input field is selected
    $('#topic').keypress(function (e) {
      if (e.which === 13) {
        $('#setTopic').click();
        return false;
      }
    });
  }

  submitTopic () {
    let socket = this.props.socket;
    let topicId = uuid();
    let topic = $('#topic').val();
    let lectureId = this.props.lectureId;
    socket.emit('submit thumbTopic', topicId, topic, lectureId);
    this.props.dispatch({type: 'SET_TOPIC', topicId: topicId, topicName: topic});
    // add thumb title, remove thumb form
    $('#topicTitle:first-child').append($('#topic').val());
    $('#topic, #setTopic').fadeOut();
  }

  render () {
    return (
      <div id='Thumbs' style={{display: 'none'}}>
        <h1 id='topicTitle'> Topic: </h1>
        <input id='topic' type='text' name='topic' /><br/>
        <button id='setTopic' onClick={this.submitTopic.bind(this)}>Set Topic</button>
        <div>
          <div>Thumbs up!<br/>{this.props.thumbs.up}</div>
          <div>Thumbs to the side!<br/>{this.props.thumbs.side}</div>
          <div>Thumbs Down!<br/>{this.props.thumbs.down}</div>
        </div>
      </div>
    );
  };

};

const mapStateToProps = (state) => {
  return {
    thumbs: state.thumbs,
    socket: state.activeLecture.socket,
    lectureId: state.activeLecture.lectureId,
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(PresThumbs);
