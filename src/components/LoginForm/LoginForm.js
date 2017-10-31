import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Auth from "../../helper/Auth/Auth.js";
import TextInput from "../TextInput/TextInput.js";
import Checker from "../../helper/Checker/Checker.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "1@gmail.com",
      password: "1"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <TextInput
          id="email"
          name="Email Adress"
          onChange={this.handleEmailChange}
          required={true}
          type="email"
          value={this.state.email}
        />
        <TextInput
          id="password"
          name="Password"
          onChange={this.handlePasswordChange}
          required={true}
          type="password"
          value={this.state.password}
        />
        <button type="submit" className="button">
          LOG IN ->
        </button>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    //close any flash message that may be visible
    // this.props.closeFlashMessage();

    const email = this.state.email.trim().toLowerCase();
    const data = { email, password: this.state.password };
    this.props.submit(data);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  clearInput() {
    this.setState({ email: "", password: "" });
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

module.exports = LoginForm;
