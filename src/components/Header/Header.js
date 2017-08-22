import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

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

class HomeLogo extends Component {
  render() {
    return (
      <li className="nav-item">
        <NavLink className="nav-link home-link" activeClassName="active" to="/">
          <MainLogo className="home-logo" />
        </NavLink>
      </li>
    );
  }
}

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
                <span>
                  {item.text.toUpperCase()}
                </span>
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

class UserLogInLogOut extends Component {
  render() {
    return (
      <div className="nav-section nav-user">
        {/*Register/Update based on token*/}
        <li className="nav-item">
          {this.props.isUserLoggedIn
            ? <NavLink
                className="nav-link"
                activeClassName="active"
                to="/account"
              >
                <img src={Avatar.Boy10} className="nav-avatar" />
                Settings
              </NavLink>
            : <NavLink
                className="nav-link"
                activeClassName="active"
                to="/register"
              >
                Register
              </NavLink>}
        </li>

        {/*Login/Logout based on token*/}
        <li className="nav-item">
          {this.props.isUserLoggedIn
            ? <NavLink
                onClick={this.props.handleLogout}
                to="/"
                className="nav-link"
                activeClassName="active"
              >
                <Logout />
                Logout
              </NavLink>
            : <NavLink
                className="nav-link"
                activeClassName="active"
                to="/login"
              >
                Login
              </NavLink>}
        </li>
      </div>
    );
  }
}

UserLogInLogOut.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
};

class Header extends Component {
  render() {
    return (
      <header className="top">
        <nav className="nav">
          <div className="nav-section nav-pages">
            {/*Home logo*/}
            <HomeLogo />

            {/*Rest of nav items*/}
            <NavItems />
          </div>

          {/*Search bar*/}
          <SearchBar />

          {/* User section */}
          <UserLogInLogOut
            isUserLoggedIn={this.props.isUserLoggedIn}
            handleLogout={this.props.handleLogout}
          />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
};

module.exports = Header;
