import React, { Component } from 'react';

import picker from '../util/googlePicker'; // import Google Picker function
import store from '../store.jsx';
// button to select Google Slides presentation from user's Google Drive to present
const NewPresButton = () => {
  return (
    <button className='btn btn-blue side-presentation-btn' onClick={() => {
      // if picker has already been created, make it visible again
      // otherwise, create a new picker
      if (store.getState().picker) {
        store.getState().picker.setVisible(true);
      } else {
        picker();
      }
    }}>New Presentation</button>
  );
};

export default NewPresButton;
