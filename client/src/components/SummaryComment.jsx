import React, { Component } from 'react';
import { connect } from 'react-redux';

import postComment from '../util/postComment.js';

class SummaryComment extends Component {
  constructor () {
    super();
    this.state = {
      newComment: '',
      toggleComment: false
    };
  }

  toggleView (toggle) {
    this.setState({newComment: this.props.comment});
    this.setState({toggleComment: toggle});
  }
  // sending a post request to the server
  saveComment (lectureId, userId) {
    postComment(lectureId, userId, this.state.newComment)
    .done(() => {
      this.setState({toggleComment: false});
      this.props.upDateComment(userId, this.state.newComment);
    });
  };

  handleChange (event) {
    this.setState({newComment: event.target.value});
  }

  render () {
    // filter user by the either presenter or selected user
    if (this.props.users) {
      const user = !this.props.userId ? this.props.users.filter(user => user.role === 'presenter')[0]
        : this.props.users.filter(user => user.user_id === this.props.userId)[0];
      return (
        <div className='summary-comment'>
          {
            !this.state.toggleComment
            ? <div>
              <p className='comment'>Comment:
                <button className='btn btn-blue' onClick={() => { this.toggleView(true); }} ><i className="fa fa-pencil"></i> Edit</button>
              </p>
              <p>{this.props.comment}</p>
            </div>
            : <div>
              <p className='comment'>Comment:
                <button className='btn btn-red' onClick={() => { this.toggleView(false); }} ><i className="fa fa-undo"></i> Cancel</button>
                <button className='btn btn-green' onClick={() => { this.saveComment(user.lecture_id, user.user_id); }} ><i className="fa fa-check"></i> Save</button>
              </p>
              <div className='form-container'>
                <input className='form-control comment-form' type = 'text' defaultValue={this.props.comment} onChange={this.handleChange.bind(this)}/>
              </div>
            </div>
          }
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.summary.users
  };
};

export default connect(mapStateToProps)(SummaryComment);
