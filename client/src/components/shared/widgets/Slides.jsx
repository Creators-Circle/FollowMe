import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../../css/Slides.css';

const Slides = ({ activeLecture }) => {
  const embedUrl = activeLecture.embedUrl;
  const title = activeLecture.name;
  const id = activeLecture.presentationId;
  // return <iframe> with embedded google slides presentation
  // current default presentation is "Effective Pairing and Feedback"
  return (
    <iframe
    className="slides"
    id={id}
    allowFullScreen="true"
    type="iframe"
    title={title}
    src={embedUrl}
    >
    </iframe>
  );
};

const mapStateToProps = ({ activeLecture }) => {
  return {
    activeLecture
  };
};

export default connect(mapStateToProps)(Slides);
