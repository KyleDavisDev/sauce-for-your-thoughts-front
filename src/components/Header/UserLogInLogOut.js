import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import Avatar from "../../helper/Avatar/Avatar.js";
import Logout from "../../images/icons/Logout.js";

const UserLogInLogOut = ({ isAuthenticated, logout }) => {
  return (
    <div className="nav-section nav-user">
      {isAuthenticated ? (
        <div className="item-holder">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/account"
            >
              <img src={Avatar.Boy10} className="nav-avatar" />
              Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              onClick={e => {
                e.preventDefault();
                logout();
              }}
              to="/"
              className="nav-link"
              activeClassName="active"
            >
              <Logout />
              Logout
            </NavLink>
          </li>
        </div>
      ) : (
        <div className="item-holder">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/register"
            >
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/login">
              Login
            </NavLink>
          </li>
        </div>
      )}
    </div>
  );
};

UserLogInLogOut.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout })(UserLogInLogOut);
