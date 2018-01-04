import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { flashError } from "../../actions/flash";

import LoginForm from "./Form.js";
import ForgotPasswordForm from "../ForgotPassword/Form.js";

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
        if (err.response) {
          this.props.flashError({ text: err.response.data.msg });
        } else {
          this.props.flashError({ text: err.msg });
        }
      });
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
