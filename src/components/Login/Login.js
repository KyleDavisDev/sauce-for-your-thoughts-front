import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

import LoginForm from "../LoginForm/LoginForm.js";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm.js";
import Auth from "./../../helper/Auth/Auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
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
        <LoginForm submit={this.submit} />
        <ForgotPasswordForm logUserIn={this.props.logUserIn} />
      </div>
    );
  }

  submit(data) {
    // console.log(data);
    this.props.login(data);
    //.then(() => this.props.history.push("/"));
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(Login);
