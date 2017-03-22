import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ChangeTitle } from '../util/actions';

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
    // update the activeLecture
    const lecture = {
      lectureId: this.props.activeLecture.lectureId,
      name: this.state.title || 'untitled',
      presentationId: this.props.activeLecture.presentationId,
      embedUrl: this.props.activeLecture.embedUrl,
      socket: this.props.activeLecture.socket
    };

    this.props.updateTitle(lecture);
    // send a socket event to the server to update the database
    lecture.socket.emit('updateTitle', lecture.lectureId, lecture.name);
    // hide the textfield
    this.setState({'toggleView': false});
  }

  handleChange (event) {
    this.setState({title: event.target.value || 'untitled'});
  }

  render () {
    return (
      <div>
        {
          !this.state.toggleView
          ? <div className='lecture-title'>
              <h1><span>{this.state.newTitle || this.props.activeLecture.name} </span>
                <i className='fa fa-pencil' onClick={() => { this.changeView(true); }}></i>
              </h1>
            </div>
          : <div>
            <input className='form-container comment-form title-form ' type='text' defaultValue={this.props.activeLecture.name}
             onChange={this.handleChange.bind(this)}/>
            <div className='title-buttons'>
              <button className='btn btn-red' onClick={() => { this.changeView(false); }}>Cancel</button>
              <button className='btn btn-green' onClick={this.changeTitle.bind(this)}>Save</button>
            </div>
          </div>
        }
        <hr/>
        <div className='sidebar-header'>
          <h2>SHARE CODE</h2>
          <p>{this.props.activeLecture.lectureId}</p>
         </div>
        <hr/>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTitle: (lecture) => {
      dispatch(ChangeTitle(lecture));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);
