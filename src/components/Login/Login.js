import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { flashError } from "../../actions/flash";

import LoginForm from "../LoginForm/LoginForm.js";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm.js";
import Auth from "./../../helper/Auth/Auth";

class Login extends Component {
  render() {
    return (
      <div className="inner">
        <LoginForm submit={this.submit} />
        <ForgotPasswordForm logUserIn={this.props.logUserIn} />
      </div>
    );
  }

  submit = data =>
    this.props
      .login(data)
      .then(() => this.props.history.push("/"))
      .catch(err => {
        this.props.flashError({ text: err.message });
      });
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login, flashError })(Login);
