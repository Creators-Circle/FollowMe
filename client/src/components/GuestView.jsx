import React, { Component } from 'react';

import FeedbackBox from './Audience/FeedbackBox';
import JoinPresBox from './shared/JoinPresBox';
import Navbar from './shared/Navbar/Navbar';

import '../css/GuestView.css';

const GuestView = () => (
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

export default GuestView;
