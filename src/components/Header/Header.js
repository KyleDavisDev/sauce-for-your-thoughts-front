import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import UserLogInLogOut from "./UserLogInLogOut";
import NavItems from "./NavItems";

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

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  render() {
    return (
      <div className="nav-section nav-search">
        <div className="search">
          <input
            type="text"
            placeholder="Coffee, beer..."
            name="search"
            onChange={this.handleSearchChange}
            value={this.state.searchValue}
          />
        </div>
      </div>
    );
  }

  handleSearchChange(e) {
    const temp = e.target.value;
    this.setState({ searchValue: e.target.value });
    axios({
      method: "get",
      url: `http://localhost:7777/api/stores/search/${temp}`
    }).then(response => console.log(response));
  }
}

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
