import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { flashError } from "../../redux/actions/flash";

import LoginForm from "./LoginForm.js";
import ForgotPasswordForm from "./ForgotPasswordForm";

class Login extends Component {
  render() {
    return (
      <div className="inner">
        <LoginForm submit={this.submit} />
        <ForgotPasswordForm logUserIn={this.props.logUserIn} />
      </div>
    );
  }

  submit = e => {
    const data = { user: e };
    this.props
      .login(data)
      .then(() => this.props.history.push("/"))
      .catch(err => {
        if (err.response) {
          this.props.flashError({ text: err.response.data.msg });
        } else {
          this.props.flashError({ text: err.msg });
        }
      });
  };
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
