import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeedbackBox from './FeedbackBox';

class App extends Component {
  constructor(){
    super()
  }

  render() {
    return(
      <div>
        <p>Hello World</p>
        {/* {if role === audience display feedback component} */}
        <FeedbackBox />
      </div>
    )
  }
}

export default connect(state => state)(App);
