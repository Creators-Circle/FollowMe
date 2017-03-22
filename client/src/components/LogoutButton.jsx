import { connect } from 'react-redux';
import React, { Component } from 'react';

import '../css/LogoutButton.css';

class LogoutButton extends Component {

  render () {
    return (
      <input id='LogoutButton' className='btn btn-blue' type="button" value="Logout"
      onClick={ () => {
        window.location.href = '/logout';
      }
      } />
    );
  };
};

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStatetoProps)(LogoutButton);
