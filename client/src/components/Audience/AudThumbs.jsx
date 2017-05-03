import React, { Component } from 'react';
import { connect } from 'react-redux';

import uuid from 'uuid/v1';
import $ from 'jquery';

class AudThumbs extends Component {

  componentDidMount () {
    const socket = this.props.socket;
    const userId = this.props.userId;
    let currentTopicId = this.props.thumbs.topicId;
    let thumbsDisplayed = this.props.thumbs.displayed;
    // render Thumbs box for the given topic when event 'open thumbs' is fired
    socket.on('open thumbs', (topicId, topic) => {
      currentTopicId = topicId;
      $('#AudThumbTopic').text(topic); // set h1 to current topic
      $('#Thumbs').fadeIn('slow'); // fade in Thumbs feature
      thumbsDisplayed = true;
    });
    $('.thumbButton').click((e) => {
      // get direction of thumb that was chosen
      const thumbChoice = e.currentTarget.attributes.id.nodeValue;
      // emit choice to the server / presenter / database
      socket.emit('thumb clicked', currentTopicId, userId, thumbChoice);
      // fade out component and set 'displayed' property to false in the store
      $('#Thumbs').fadeOut(1);
      thumbsDisplayed = false;
    });

    // Trigger thumbs box to close if still open
    socket.on('close thumbs', () => {
      if (thumbsDisplayed) $('#Thumbs').fadeOut('fast');
      thumbsDisplayed = false;
    });
  };

  render () {
    const thumbDisplay = this.props.thumbs.displayed ? 'block' : 'none';
    return (
      <div id="Thumbs" style={{display: thumbDisplay}}>
        <span className="sidebar-header"><h2 id="AudThumbTopic">{this.props.thumbs.topicName}</h2></span>
        <img src='./img/1-thumb.png' className='thumbButton' id='up'/>
        <img src='./img/2-thumb.png' className='thumbButton' id='side'/>
        <img src='./img/3-thumb.png' className='thumbButton' id='down'/>
        <hr/>
      </div>
    );
  };
};

const mapStateToProps = ({ activeLecture, user, thumbs }) => {
  return {
    socket: activeLecture.socket,
    userId: user.id,
    thumbs
  };
};

export default connect(mapStateToProps)(AudThumbs);
