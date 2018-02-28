import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import UserLogInLogOut from "./UserLogInLogOut";
import NavItems from "./NavItems";
import SearchBar from "./SearchBar";
import MainLogo from "../../images/icons/Logo.js";
import Logout from "../../images/icons/Logout.js";
const LogoSFYT = require("../../images/icons/LogoSFYT.png");

const HomeLogo = () => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link home-link" activeClassName="active" to="/">
        {/* <MainLogo className="home-logo" /> */}
        <img src={LogoSFYT} className="home-logo" />
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
