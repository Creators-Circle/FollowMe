import React, { Component } from 'react';

// Input to search database for specific presentation
class Searchbar extends Component {

  search(event) {
    this.props.updateSearch(event.target.value);
  }

  render () {
    return (
      <input type='text' onChange = {this.search.bind(this)} placeholder='Search old slides'/>
    );
  };
};

export default Searchbar;
