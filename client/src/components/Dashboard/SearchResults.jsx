import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import PresThumbnail from './PresThumbnail';

const SearchResults = ({ searchValue, userLectures }) => {
  // filter the lectures by user input
  const searchLectures = userLectures.filter(lecture =>
    lecture.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div>
      <ul>
      { searchLectures.length === 0 ? <p className ='no-results'>No results found</p>
        : searchLectures.map((lecture, i) =>
        // restrict click functionality for viewed lectures
          <li className='slideThumb'>
          {
            lecture.role === 'audience'
            ? <a key={i} href={`https://docs.google.com/presentation/d/${lecture.presentation_id}/preview`} target='_blank'>
                <PresThumbnail key = {lecture.id} viewed={true} date = {lecture.date} name = {lecture.name} />
              </a>
            : <Link key={i} to={`/summary/${lecture.lecture_id}`}>
                <PresThumbnail date = {lecture.date} name = {lecture.name} />
              </Link>
          }
          </li>
      )}
      </ul>
    </div>
  );
};

const mapStateToProps = ({userLectures, searchValue}) => {
  return {
    userLectures,
    searchValue
  };
};

export default connect(mapStateToProps)(SearchResults);
