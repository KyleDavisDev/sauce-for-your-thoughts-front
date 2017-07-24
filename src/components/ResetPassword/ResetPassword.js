import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

class ResetPasswordForm extends Component {
  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        <h2>Reset Password</h2>

        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={this.props.password}
          onChange={this.props.handlePasswordChange}
          required
        />

        <label htmlFor="confirmPassword"> Confirm Password: </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={this.props.confirmPassword}
          onChange={this.props.handleConfirmPasswordChange}
          required
        />

        <button type="submit" className="button">
          Save ->
        </button>
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleConfirmPasswordChange: PropTypes.func.isRequired
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  componentDidMount() {
    const token = this.props.token;
    this.resetUserPassword(token);
  }

  render() {
    return (
      <div className="inner">
        <ResetPasswordForm
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          handleSubmit={this.handleSubmit}
          handlePasswordChange={this.handlePasswordChange}
          handleConfirmPasswordChange={this.handleConfirmPasswordChange}
        />
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const { password, confirmPassword } = this.state;

    axios({
      method: "post",
      url: "http://localhost:7777/account/reset",
      data: {
        token: this.props.token,
        password,
        confirmPassword
      }
    })
      .then(response => {
        if (response.data.isGood) {
          //set token
          Auth.authenticateUser(response.data.token);

          //create flash
          this.props.createFlashMessage({
            type: "success",
            text: response.data.msg
          });

          //at this point, we will be redirect via Router.js
          return;
        } else {
          this.props.createFlashMessage({
            type: "error",
            text: response.data.msg
          });
        }
      })
      .catch(err => console.log(err));
  }

  resetUserPassword(token) {
    axios({
      method: "post",
      url: "http://localhost:7777/account/validateResetToken/",
      data: { token }
    })
      .then(response => {
        console.log(response);
        if (response.data.isGood) {
          this.props.createFlashMessage({
            type: "caution",
            text: response.data.msg
          });
        } else {
          this.props.createFlashMessage({
            type: "error",
            text: response.data.msg
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }
}

ResetPassword.propTypes = {
  createFlashMessage: PropTypes.func.isRequired
};

module.exports = ResetPassword;
