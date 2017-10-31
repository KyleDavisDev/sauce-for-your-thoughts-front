import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Validator from "validator";

import Auth from "../../helper/Auth/Auth.js";
import TextInput from "../TextInput/TextInput.js";
import Checker from "../../helper/Checker/Checker.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "1@gmail.com",
        password: "1"
      },
      errors: {
        email: "",
        password: "",
        submit: ""
      }
    };
  }

  render() {
    const { email, password } = this.state.data;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <TextInput
          id="email"
          name="Email Adress"
          onChange={this.handleEmailChange}
          type="email"
          value={email}
        />
        {this.state.errors.email && (
          <p style={{ color: "red" }}>{this.state.errors.email}</p>
        )}
        <TextInput
          id="password"
          name="Password"
          onChange={this.handlePasswordChange}
          type="password"
          value={password}
        />
        {this.state.errors.password && (
          <p style={{ color: "red" }}>{this.state.errors.password}</p>
        )}
        <button type="submit" className="button">
          LOG IN ->
        </button>
      </form>
    );
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    // console.log(errors);
    this.setState({ errors: Object.assign({}, this.state.errors, errors) });

    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: { ...this.state.errors, submit: err.message }
        })
      );
    }
  };

  handleEmailChange = e => {
    this.setState({ data: { ...this.state.data, email: e.target.value } });
  };

  handlePasswordChange = e => {
    this.setState({ data: { ...this.state.data, password: e.target.value } });
  };

  clearInput = () => {
    this.setState({ email: "", password: "" });
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid email";
    }
    if (!data.password) {
      errors.password = "Cannot be empty";
    }
    return errors;
  };
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

module.exports = LoginForm;
