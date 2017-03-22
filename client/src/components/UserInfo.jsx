import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/UserInfo.css';

class UserInfo extends Component {

  render () {
    return (
      <span id='userInfo'>
        <img id='profilePic' src={this.props.user.avatar} />
      </span>
    );
  };
};

const mapStatetoProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStatetoProps)(UserInfo);
