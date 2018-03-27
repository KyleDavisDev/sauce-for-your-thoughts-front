import React from "react";
import { NavLink } from "react-router-dom";
import UserLogInLogOut from "./UserLogInLogOut";
import NavItems from "./NavItems";
import SearchBar from "./SearchBar";

import LogoSFYT from "../../images/icons/LogoSFYT.js";
// const LogoSFYT = require("../../images/icons/LogoSFYT.png");

const HomeLogo = () => (
  <li className="nav-item">
    <NavLink className="nav-link home-link" activeClassName="active" to="/">
      <LogoSFYT />
    </NavLink>
  </li>
);

const Header = () => (
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

export default Header;
