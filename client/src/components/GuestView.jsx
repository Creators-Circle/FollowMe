import React, { Component } from 'react';

import FeedbackBox from './FeedbackBox';
import JoinPresBox from './JoinPresBox';
import LogoutButton from './LogoutButton';
import Navbar from './Navbar';

import '../css/GuestView.css';

class GuestView extends Component {

  render () {
    return (
      <div id="GuestViewBody">
        <Navbar/>
        <div id="GuestJoin">
          <div id="GuestTitle">Welcome, Stranger</div>
          <div id="GuestSubtitle">Enter your 6 digit acess code to get started</div>
          <div id="JoinPresBoxGuest">
            <JoinPresBox role="guest"/>
          </div>
        </div>
      </div>
    );
  }
};

export default GuestView;
