import React, { Component } from "react";
import PropTypes from "prop-types";

import LoginForm from "../LoginForm/LoginForm.js";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm.js";
import Auth from "./../../helper/Auth/Auth";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    //make sure user is logged out
    this.logUserOut();
  }
  logUserOut() {
    Auth.deauthenticateUser();
    this.setState({ isUserLoggedIn: Auth.isUserAuthenticated() });
  }
  render() {
    return (
      <div className="inner">
        <LoginForm logUserIn={this.props.logUserIn} />
        <ForgotPasswordForm logUserIn={this.props.logUserIn} />
      </div>
    );
  }
}

module.exports = Login;
