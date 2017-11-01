import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import UserLogInLogOut from "./UserLogInLogOut";

//logos
import MainLogo from "../../images/icons/Logo.js";
import StoresLogo from "../../images/icons/Store.js";
import TagLogo from "../../images/icons/Tag.js";
import TopLogo from "../../images/icons/Top.js";
import AddLogo from "../../images/icons/Add.js";
import MapLogo from "../../images/icons/Map.js";

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

class NavItems extends Component {
  render() {
    const navigationItems = [
      {
        text: "Stores",
        img: <StoresLogo />,
        linkTo: "stores",
        imgTitle: "Stores"
      },
      {
        text: "Tags",
        img: <TagLogo />,
        linkTo: "tags",
        imgTitle: "Tags"
      },
      {
        text: "Top",
        img: <TopLogo />,
        linkTo: "top",
        imgTitle: "Top"
      },
      {
        text: "Add",
        img: <AddLogo />,
        linkTo: "add",
        imgTitle: "Add"
      },
      {
        text: "Map",
        img: <MapLogo />,
        linkTo: "map",
        imgTitle: "Map"
      }
    ];
    return (
      <div className="item-holder">
        {navigationItems.map(item => {
          return (
            <li key={item.text} className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to={`/${item.linkTo}`}
              >
                {item.img}
                <span>{item.text.toUpperCase()}</span>
              </NavLink>
            </li>
          );
        })}
      </div>
    );
  }
}

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
