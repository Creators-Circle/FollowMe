import React, { Component } from 'react';
import { connect } from 'react-redux';

// Input to search database for specific presentation
class Searchbar extends Component {

  // function to update the searchValue reducer whenever a user types in the searchbar
  search (event) {
    this.props.dispatch({
      type: 'UPDATE_SEARCH_VALUE',
      value: event.target.value
    });
  }

  render () {
    return (
      <input type='text' onChange = {this.search.bind(this)} placeholder='Search old slides'/>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(Searchbar);
