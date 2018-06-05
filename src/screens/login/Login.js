import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoginForm from "./components/loginForm/LoginForm";
import LoginForgotPasswordForm from "./components/loginForgotPasswordForm/LoginForgotPasswordForm";

import { login } from "../../redux/actions/auth";
import { flashError } from "../../redux/actions/flash";

class Login extends Component {
  render() {
    return (
      <div className="inner">
        <LoginForm submit={this.submit} />
        <LoginForgotPasswordForm logUserIn={this.logUserIn} />
      </div>
    );
  }

  submit = e => {
    const data = { user: e };
    this.props
      .login(data)
      .then(() => this.props.history.push("/"))
      .catch(err => {
        console.log(err.msg);
        if (err.response) {
          this.props.flashError({ text: err.response.data.msg });
        } else {
          this.props.flashError({ text: err.msg });
        }
      });
  };

  logUserIn = () => {};
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  login: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired
};

const matchDispatchToProps = {
  login,
  flashError
};

export default connect(null, matchDispatchToProps)(Login);
