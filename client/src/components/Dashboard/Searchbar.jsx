import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UpdateSearchValue } from '../../util/actions';

class Searchbar extends Component {
  // function to update the searchValue reducer whenever a user types in the searchbar
  search (event) {
    this.props.updateSearchValue(event.target.value);
  }

  render () {
    return (
      <input
        className='form-control input-form'
        type='text' onChange = {this.search.bind(this)}
        placeholder='Search old slides'
      />
    );
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearchValue: (value) => {
      dispatch(UpdateSearchValue(value));
    }
  };
};

export default connect(null, mapDispatchToProps)(Searchbar);
