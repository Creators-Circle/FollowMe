import React, { Component } from 'react';
import { Link } from 'react-router';

import DashMainContent from './DashMainContent';
import JoinPresBox from '../shared/JoinPresBox';
import Navbar from '../shared/Navbar/Navbar';
import NewPresButton from './NewPresButton';
import Searchbar from './Searchbar';

const DashboardView = () => (
  <div>
    <Navbar/>
    <div className='container dash-board'>
      <div className='row'>
        <div className='main-dash col-sm-9 col-md-9 col-md-9'>
          <DashMainContent/>
        </div>
        <div className='side-main-view col-sm-3 col-md-3 col-lg-3'>
          <Searchbar/>
          <NewPresButton/>
          <hr/>
          <JoinPresBox/>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardView;
