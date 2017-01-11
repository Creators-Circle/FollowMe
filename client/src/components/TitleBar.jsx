//  TitleBar renders at the top of PresenterView.
  // Displays the presentation title and the Date as default lectureTitle.
    //  lectureTitle is editable.
  // Displays lectureID.
  // TODO Make Title editable.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx';
class TitleBar extends Component {
  constructor () {
    super();
    // Date set-up here so it only calculates once.
    this.d = new Date();
    this.now = this.d.getHours() + ':' + this.d.getMinutes() + '  ' + this.d.getDate() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getFullYear();
    // ui state
    this.state = {
      toggleView: false,
      title: undefined // for accessing the text inside the input field
    };
  }
  // show/hide textbox field
  changeView (toggle) {
    this.setState({toggleView: toggle});
  }

  changeTitle () {
    // update the activeLecture ducer
    let lecture = {
      lectureId: this.props.activeLecture.lectureId,
      name: this.state.title,
      presentationId: this.props.activeLecture.presentationId,
      embedUrl: this.props.activeLecture.embedUrl,
      socket: this.props.activeLecture.socket
    };

    this.props.dispatch(
      {
        type: 'UPDATE_TITLE',
        lecture: lecture
      }
    );
    // send a socket event to the server to update the database
    lecture.socket.emit('udpateTitle', lecture.lectureId, lecture.name);
    // hide the textfield
    this.setState({'toggleView': false});
  }

  handleChange (event) {
    this.setState({title: event.target.value});
  }

  render () {
    return (
      <div>
        {
          !this.state.toggleView
          ? <div>
              <h1> Lecture Title: {this.state.newTitle || this.props.activeLecture.name}</h1>
              <button onClick={() => { this.changeView(true); }}>Edit</button>
            </div>
          : <div>
            <input type='text' defaultValue={this.props.activeLecture.name}
             onChange={this.handleChange.bind(this)}/>
            <button onClick={() => { this.changeView(false); }}>Cancel</button>
            <button onClick={this.changeTitle.bind(this)}>Save</button>
          </div>
        }
       <h2> Join Code {this.props.activeLecture.lectureId} </h2>
      </div>
    );
  };

};
const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture
  };
};

export default connect(mapStateToProps)(TitleBar);
