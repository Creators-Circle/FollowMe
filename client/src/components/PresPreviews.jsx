import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import PresThumbnail from './PresThumbnail';

import { StoreUserLectures } from '../util/actions';

class PresPreviews extends Component {
  componentWillMount () {
    // store all the lectures of the user in the store
    this.props.storeUserLectures();
  }

  render () {
    // add the tutorial lecture
    const recentLectures = [{
      name: 'Tutorial Lecture \n **Start Here**',
      presentation_id: '1G-H4ZFvoVotkXdsAKlZBwdWjJXOrj7iheWuFk7wARNY',
      lecture_id: 'tutorial',
      role: 'presenter',
      date: new Date().toISOString()
    }] /* filter the most recent lectures and filter depending on the role given */
      .concat(this.props.userLectures
      .filter(lecture => lecture.role === this.props.role).slice(0, 7));
    // only the presenter can view the summary of his lecture
    if (this.props.role === 'presenter') {
      return (
        <div className='recent-lectures'>
          <ul>
          {
            recentLectures.length > 0
              ? recentLectures.map((lecture, i) =>
              <li key={i} className='slideThumb'>
                <Link key={i} to={`/summary/${lecture.lecture_id}`}>
                  <PresThumbnail date = {lecture.date} name = {lecture.name} />
                </Link>
              </li>
              ) : <p>No recent activites</p>
          }
          </ul>
        </div>
      );
    } else {
      return (
        <div className='recent-lectures'>
          <ul>
          {
            recentLectures.length > 0
              ? recentLectures.map((lecture, i) =>
                <li className='slideThumb'>
                  <a key={i} href={`https://docs.google.com/presentation/d/${lecture.presentation_id}/preview`} target='_blank'>
                    <PresThumbnail
                      key={i}
                      id = {lecture.id}
                      date = {lecture.date}
                      name = {lecture.name}
                      viewed = {true}
                    />
                  </a>
                </li>
              ) : <p>No recent activites</p>
          }
          </ul>
        </div>
      );
    }
  };
};

const mapStatetoProps = (state) => {
  return {
    userLectures: state.userLectures
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeUserLectures: () => {
      dispatch(StoreUserLectures());
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(PresPreviews) ;
