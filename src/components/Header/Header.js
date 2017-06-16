import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

//pull in logos
import MainLogo from "../../images/icons/Logo.js";
import StoresLogo from "../../images/icons/Store.js";
import TagLogo from "../../images/icons/Tag.js";
import TopLogo from "../../images/icons/Top.js";
import AddLogo from "../../images/icons/Add.js";
import MapLogo from "../../images/icons/Map.js";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ searchValue: "" });
  }

  handleSearchChange(event) {
    this.setState({ searchValue: event.target.value });
  }

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
      <header className="top">
        <nav className="nav">
          <div className="nav-section nav-pages">

            <li className="nav-item">
              <NavLink
                exact
                className="nav-link home-link"
                activeClassName="active"
                to="/"
              >
                <MainLogo className="home-logo" />
              </NavLink>
            </li>
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

          <div className="nav-section nav-search">
            <div className="search">
              <form onSubmit={this.handleSubmit} name="headerForm">
                <input
                  type="text"
                  placeholder="Coffee, beer..."
                  name="search"
                  onChange={this.handleSearchChange}
                  value={this.state.searchValue}
                />
                <button type="submit" className="search"> Submit </button>
              </form>
            </div>
          </div>

          <div id="nav-section nav-user">
            <button type="button" className="button"> Register </button>
            <button type="button" className="button"> Log In </button>
          </div>
        </nav>
      </header>
    );
  }
}

module.exports = Header;
