import React, { Component } from 'react';
import PresThumb from './PresThumb';
import { connect } from 'react-redux';

// panel to display search results from querying DB for specific presentation data
  // Rendered by loginDashboard.
class SearchResults extends Component {

  render () {
    let search = this.props.search;
    // filter the lectures by the input given by the user
    let searchLectures = this.props.userLectures.filter(lecture => lecture.name.includes(search));
    return (
      <div>
        { searchLectures.length === 0 ? <p>No results found</p>
          : searchLectures.map(lecture =>
          <PresThumb key = {lecture.id} date = {lecture.date} name = {lecture.name} />
        )}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userLectures: state.userLectures,
    search: state.searchValue
  };
};

export default connect(mapStateToProps)(SearchResults);
