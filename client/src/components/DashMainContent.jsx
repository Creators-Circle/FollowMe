import React, { Component } from 'react';
import PresPreviews from './PresPreviews';
import SearchResults from './SearchResults';
import '../css/Dashboard.css';
import { connect } from 'react-redux';

// main content panel in the DashboardView
  // by default it renders Recently Presented Slideshows / Recently Viewed Presentations
  // if a specific presentation is searched for, the results will appear in this area
class DashMainContent extends Component {
  constructor () {
    super();
    this.state = {
      role: 'presenter'// state for changing the view of presPreview component
    };
  }

  changeView (view) {
    this.setState({role: view});
  }

  render () {
    // if the searchbar is empty display the default view, else display the results
    if (!this.props.search) {
      return (
        <div>
          <div id='recentMenu'>
            <div id='recentlyPresented' onClick = { () => { this.changeView('presenter'); } }>Recently Presented</div>
            <div id='recentlyViewed' onClick = { () => { this.changeView('audience'); } }>Recently Viewed</div>
            <PresPreviews role = {this.state.role} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Search Results</h1>
          <SearchResults search={this.props.search}/>
        </div>
      );
    }
  };
};

const mapStateToProps = (state) => {
  return {
    search: state.searchValue
  };
};
export default connect(mapStateToProps)(DashMainContent);
