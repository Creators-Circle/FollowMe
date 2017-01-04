import React, { Component } from 'react';
import NewPresButton from './NewPresButton';
import Searchbar from './Searchbar';
import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';
import JoinPresBox from './JoinPresBox';
import DashMainContent from './DashMainContent';
import { Link } from 'react-router';

// view that every user sees after logging in
class DashboardView extends Component {
  constructor () {
    super();
    this.state = {
      search: ''
    };
  };
  updateSearch (value) {
    this.setState({search: value});
    console.log('dashview', this.state.search);
  };

  render () {
    return (
      <div>
        <LogoutButton/>
        <div>
          <NewPresButton/>
          <Searchbar updateSearch={this.updateSearch.bind(this)}/>
          <Link to='/presenter'><button id='presenterButton'>Presenter</button></Link>
          <Link to='/audience'><button id='audienceButton'>Audience</button></Link>
          <UserInfo/>
        </div>
        <DashMainContent search={this.state.search}/>
        <JoinPresBox/>
      </div>
    );
  };
};

export default DashboardView;
