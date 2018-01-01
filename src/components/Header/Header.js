import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import UserLogInLogOut from "./UserLogInLogOut";
import NavItems from "./NavItems";
import SearchBar from "./SearchBar";

import MainLogo from "../../images/icons/Logo.js";

//avatar for logged in users
import Avatar from "../../helper/Avatar/Avatar.js";

//login/logout icon
import Logout from "../../images/icons/Logout.js";

const HomeLogo = () => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link home-link" activeClassName="active" to="/">
        <MainLogo className="home-logo" />
      </NavLink>
    </li>
  );
};

const Header = () => {
  return (
    <header className="top">
      <nav className="nav">
        <div className="nav-section nav-pages">
          <HomeLogo />
          <NavItems />
        </div>

        <SearchBar />
        <UserLogInLogOut />
      </nav>
    </header>
  );
};

export default Header;
