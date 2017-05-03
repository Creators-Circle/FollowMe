import React, { Component } from 'react';
import { Link } from 'react-router';

import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';

import '../../../css/Navbar.css';

const Navbar = () => (
  <div id="NavbarContainer">
    <div id="BrandContainer">
      <Link to={'/'}><img id="logo" className="navbarElement" src='/../img/logo.png'/><span>Pulser</span></Link>
    </div>
    <LogoutButton/>
    <UserInfo/>
  </div>
);
export default Navbar;
