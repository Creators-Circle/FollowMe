import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeedbackButton from './FeedbackButton';
import QuestionBox from '../shared/Widgets/QuestionBox';
import AudThumbs from './AudThumbs';

import '../../css/FeedbackBox.css';

class FeedbackBox extends Component {
  render () {
    const title = this.props.title || this.props.activeLecture.name;
    return (
      <div id="FeedbackBox">
        <div className="lecture-title"><h1>{title}</h1></div>
        <hr/>
        <div id="FeedbackButtonContainer">
          <FeedbackButton />
          <hr/>
        </div>
        <div id="AudThumbsContainer">
          <AudThumbs />
        </div>
        <div id="QuestionBoxContainer">
          <QuestionBox role={'audience'}/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ activeLecture }) => {
  return {
    activeLecture
  };
};

export default connect(mapStateToProps)(FeedbackBox);
